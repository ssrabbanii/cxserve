import { auth, db } from "@/firebase";
import { Hotel } from "@/types/models/hotel";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore/lite";

// Get
const getHotels = async (): Promise<Hotel[]> => {
  const hotelsCol = collection(db, "hotels");
  const q = query(hotelsCol);
  const hotelSnapshot = await getDocs(q);
  const hotelList = hotelSnapshot.docs.map((doc) => doc.data());
  return hotelList as Hotel[];
};

export const useHotels = () => {
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

export const useHotel = (hotelId: string) => {
  return useQuery({
    queryFn: () => getHotel(hotelId),
    queryKey: [`hotel-${hotelId}`],
  });
};
