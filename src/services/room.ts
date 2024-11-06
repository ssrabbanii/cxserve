import { db } from "@/firebase";
import { Room } from "@/types/models/room";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { getHotel } from "./hotel";

// Get

const getRooms = async (hotelId: string): Promise<Room[]> => {
  const roomsCol = collection(db, `rooms`);
  const q = query(roomsCol, where("hotelId", "==", hotelId));
  const roomSnapshot = await getDocs(q);
  const roomList = roomSnapshot.docs.map((doc) => doc.data());
  return roomList as Room[];
};

export const useRooms = (hotelId: string) => {
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

export const useRoom = (roomId: string) => {
  return useQuery({
    queryFn: () => getRoom(roomId),
    queryKey: [`room-${roomId}`],
  });
};

export const useRoomAndHotel = (roomId: string) => {
  return useQuery({
    queryFn: async () => {
      const room = await getRoom(roomId);
      const hotel = await getHotel(room.hotelId);
      return { room, hotel };
    },
    queryKey: [`room-${roomId}`],
  });
}