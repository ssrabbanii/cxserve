import { auth, db, storage } from "@/firebase";
import { HOTEL_STATUS, Hotel, HotelFormInput } from "@/types/models/hotel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  setDoc,
  where,
} from "firebase/firestore/lite";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

// Set

interface CreateHotelInput {
  name: string;
  managerId: string;
}

const createHotel = async ({ name, managerId }: CreateHotelInput) => {
  const ref = doc(collection(db, "hotels"));
  await setDoc(ref, {
    id: ref.id,
    managerId: managerId,
    name: name,
    status: HOTEL_STATUS.UNAPPROVED,
  });
  return { id: ref.id };
};

export const useCreateHotel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createHotel,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
      navigate(`/hotels/${data.id}`);
    },
    onError: (err) => {
      console.error("Error creating hotel:", err.message);
    },
  });
};

export const uploadHotelImages = async (
  files: File[],
  hotelId: string
) => {
  const metadata = {
    contentType: "image/jpeg",
  };

  const uploadResults = await Promise.all(
    files.map((file) => {
      const storageRef = ref(
        storage,
        `hotels/${hotelId}/image_${uuidv4()}.jpg`
      );
      return uploadBytes(storageRef, file, metadata);
    })
  );

  const urls = await Promise.all(
    uploadResults.map((uploadResult) => getDownloadURL(uploadResult.ref))
  );

  return { uploadResults, urls };
};

const updateHotel = async (hotelData: HotelFormInput) => {
  const { imageFiles, ...data } = hotelData
  const { urls } = await uploadHotelImages(
    imageFiles,
    data.id
  );
  const images = [...data.images, ...urls];
  await setDoc(doc(db, "hotels", data.id), {
    ...data,
    images: images,
  });
  return { id: data.id };
};

const updateHotelAtomic = async (hotelData: HotelFormInput) => {
  // https://firebase.google.com/docs/firestore/manage-data/transactions

  const { imageFiles, ...data } = hotelData
  const { uploadResults, urls } = await uploadHotelImages(
    imageFiles,
    data.id
  );

  const images = [...data.images, ...urls];

  try {
    await runTransaction(db, async (transaction) => {
      const hotelRef = doc(db, "hotels", data.id);
      transaction.set(hotelRef, {
        ...data,
        images: images,
      });
    });
    return { id: hotelData.id };
  } catch (error) {
    await Promise.all(
      uploadResults.map((uploadResult) => deleteObject(uploadResult.ref))
    );
    throw new Error(`Failed to update hotel: ${(error as any).message}`);
  }
};

export const useUpdateHotel = (setEditMode: (editMode: boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateHotelAtomic,
    onSuccess: (data) => {
      console.log("Updated: ", data.id)
      queryClient.invalidateQueries({ queryKey: [`hotel-${data.id}`] });
      setEditMode(false);
    },
    onError: (err) => {
      console.error("Error setting hotel:", err.message);
    },
  });
};

// Get
const getHotels = async (): Promise<Hotel[]> => {
  const manager = auth.currentUser;
  const hotelsCol = collection(db, "hotels");
  const q = query(hotelsCol, where("managerId", "==", manager!.uid));
  const hotelSnapshot = await getDocs(q);
  const hotelList = hotelSnapshot.docs.map((doc) => doc.data());
  return hotelList as Hotel[];
};

export const useGetHotels = () => {
  return useQuery({
    queryFn: getHotels,
    queryKey: ["hotels"],
  });
};

export const getHotel = async (hotelId: string): Promise<Hotel> => {
  // Ensure manager has manager id
  const hotelDoc = doc(db, "hotels", hotelId);
  const hotelSnapshot = await getDoc(hotelDoc);
  return hotelSnapshot.data() as Hotel;
};

export const useGetHotel = (hotelId: string) => {
  return useQuery({
    queryFn: () => getHotel(hotelId),
    queryKey: [`hotel-${hotelId}`],
  });
};
