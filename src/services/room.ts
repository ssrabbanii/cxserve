import { auth, db, storage } from "@/firebase";
import { Hotel } from "@/types/models/hotel";
import { ROOM_STATUS, Room, RoomFormInput } from "@/types/models/room";
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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getHotel } from "./hotel";

// Set

interface CreateRoomInput {
  type: string;
  hotelId: string;
}

const createRoom = async ({ type, hotelId }: CreateRoomInput) => {
  const ref = doc(collection(db, `rooms`));
  await setDoc(ref, {
    id: ref.id,
    hotelId: hotelId,
    type: type,
    status: ROOM_STATUS.DRAFT,
  });
  return { id: ref.id, hotelId: hotelId };
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createRoom,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["rooms", data.hotelId] });
      navigate(`/rooms/${data.id}`);
    },
    onError: (err) => {
      console.error("Error creating room:", err.message);
    },
  });
};

export const uploadRoomImages = async (files: File[], roomId: string) => {
  const metadata = {
    contentType: "image/jpeg",
  };

  const uploadResults = await Promise.all(
    files.map((file) => {
      const storageRef = ref(storage, `rooms/${roomId}/image_${uuidv4()}.jpg`);
      return uploadBytes(storageRef, file, metadata);
    })
  );

  const urls = await Promise.all(
    uploadResults.map((uploadResult) => getDownloadURL(uploadResult.ref))
  );

  return { uploadResults, urls };
};

const updateRoom = async (roomData: RoomFormInput) => {
  const { imageFiles, ...data } = roomData;
  const { urls } = await uploadRoomImages(imageFiles, data.id);
  const images = [...data.images, ...urls];
  await setDoc(doc(db, `rooms`, data.id), {
    ...data,
    images: images,
  });
  return { id: data.id };
};

const updateRoomAtomic = async (roomData: RoomFormInput) => {
  const { imageFiles, ...data } = roomData;
  const { uploadResults, urls } = await uploadRoomImages(imageFiles, data.id);

  const images = [...data.images, ...urls];

  try {
    await runTransaction(db, async (transaction) => {
      const roomRef = doc(db, `rooms`, data.id);
      transaction.set(roomRef, {
        ...data,
        images: images,
      });
    });
    return { id: roomData.id };
  } catch (error) {
    await Promise.all(
      uploadResults.map((uploadResult) => deleteObject(uploadResult.ref))
    );
    throw new Error(`Failed to update room: ${(error as any).message}`);
  }
};

export const useUpdateRoom = (setEditMode: (editMode: boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRoomAtomic,
    onSuccess: (data) => {
      console.log("Updated: ", data.id);
      queryClient.invalidateQueries({ queryKey: [`room-${data.id}`] });
      setEditMode(false);
    },
    onError: (err) => {
      console.error("Error setting room:", err.message);
    },
  });
};

// Get
const getRooms = async (hotelId: string): Promise<Room[]> => {
  const roomsCol = collection(db, `rooms`);
  const q = query(roomsCol, where("hotelId", "==", hotelId));
  const roomSnapshot = await getDocs(q);
  const roomList = roomSnapshot.docs.map((doc) => doc.data());
  return roomList as Room[];
};

export const useGetRooms = (hotelId: string) => {
  return useQuery({
    queryFn: () => getRooms(hotelId),
    queryKey: ["rooms", hotelId],
  });
};

export const getRoom = async (roomId: string): Promise<Room> => {
  const roomDoc = doc(db, "rooms", roomId);
  const roomSnapshot = await getDoc(roomDoc);
  return roomSnapshot.data() as Room;
};

export const useGetRoom = (roomId: string) => {
  return useQuery({
    queryFn: () => getRoom(roomId),
    queryKey: [`room-${roomId}`],
  });
};

const getHotelsWithRooms = async (): Promise<{ hotel: Hotel; rooms: Room[] }[]> => {
  const manager = auth.currentUser;

  const hotelsCol = collection(db, "hotels");
  const q = query(hotelsCol, where("managerId", "==", manager!.uid));
  const hotelsSnapshot = await getDocs(q);
  const hotels = hotelsSnapshot.docs.map((doc) => doc.data()) as Hotel[];

  const hotelIds = hotels.map((hotel) => hotel.id);

  if (hotelIds.length === 0) {
    return [];
  }

  const roomsCol = collection(db, "rooms");
  const roomsQuery = query(roomsCol, where("hotelId", "in", hotelIds));
  const roomsSnapshot = await getDocs(roomsQuery);
  const rooms = roomsSnapshot.docs.map((doc) => doc.data()) as Room[];

  const hotelsWithRooms = hotels.map((hotel) => ({
    hotel,
    rooms: rooms.filter((room) => room.hotelId === hotel.id),
  }));

  return hotelsWithRooms;
};

export const useGetHotelsWithRooms = () => {
  return useQuery({
    queryFn: getHotelsWithRooms,
    queryKey: ["hotelsWithRooms"],
  });
}