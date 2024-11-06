import { auth, db } from "@/firebase";
import { Booking, BookingFormInput } from "@/types/models/booking";
import { Hotel } from "@/types/models/hotel";
import { Room } from "@/types/models/room";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore/lite";
import { getHotel } from "./hotel";
import { getRoom } from "./room";
import { dateRangeOrFbTimestampToDateRange } from "@/utils/datetime";

// Set

const createBooking = async (bookingInfo: BookingFormInput) => {
  const ref = doc(collection(db, `bookings`));
  await setDoc(ref, {
    ...bookingInfo,
    id: ref.id,
  });
  return {
    id: ref.id,
    hotelId: bookingInfo.hotelId,
    roomId: bookingInfo.roomId,
  };
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["hotelsWithRoomsAndBookings"],
      });
      queryClient.invalidateQueries({ queryKey: ["bookings", data.hotelId] });
    },
    onError: (err) => {
      console.error("Error creating booking:", err.message);
    },
  });
};

const updateBooking = async (bookingInfo: BookingFormInput) => {
  const ref = doc(db, `bookings`, bookingInfo.id);
  await setDoc(ref, bookingInfo);
  return {
    id: ref.id,
    hotelId: bookingInfo.hotelId,
    roomId: bookingInfo.roomId,
  };
};

export const useUpdateBooking = (setEditMode: (editMode: boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`booking-${data.id}`] });
      setEditMode(false);
    },
    onError: (err) => {
      console.error("Error setting booking:", err.message);
    },
  });
};

// Get

const getBookings = async (hotelId: string): Promise<Booking[]> => {
  const bookingsCol = collection(db, `bookings`);
  const q = query(bookingsCol, where("hotelId", "==", hotelId));
  const bookingSnapshot = await getDocs(q);
  const bookingList = bookingSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Booking[];
  return bookingList;
};

export const useGetBookings = (hotelId: string) => {
  return useQuery({
    queryFn: () => getBookings(hotelId),
    queryKey: ["bookings", hotelId],
  });
};

// Fetch a specific booking by its ID
const getBooking = async (bookingId: string): Promise<Booking> => {
  const bookingDoc = doc(db, "bookings", bookingId);
  const bookingSnapshot = await getDoc(bookingDoc);
  const booking = bookingSnapshot.data() as Booking;
  return {
    ...booking,
    dateRange: dateRangeOrFbTimestampToDateRange(booking.dateRange),
  };
};

export const useGetBooking = (bookingId: string) => {
  return useQuery({
    queryFn: () => getBooking(bookingId),
    queryKey: [`booking-${bookingId}`],
  });
};

const getHotelsWithRoomsAndBookings = async (): Promise<
  { hotel: Hotel; rooms: { room: Room; bookings: Booking[] }[] }[]
> => {
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

  const bookingsCol = collection(db, "bookings");
  const bookingsQuery = query(bookingsCol, where("hotelId", "in", hotelIds));
  const bookingsSnapshot = await getDocs(bookingsQuery);
  const bookings = bookingsSnapshot.docs.map((doc) => doc.data()) as Booking[];

  const roomsWithBookings = rooms.map((room) => ({
    room,
    bookings: bookings.filter((booking) => booking.roomId === room.id),
  }));

  const hotelsWithRooms = hotels.map((hotel) => ({
    hotel,
    rooms: roomsWithBookings.filter((room) => room.room.hotelId === hotel.id),
  }));

  return hotelsWithRooms;
};

export const useGetHotelsWithRoomsAndBookings = () => {
  return useQuery({
    queryFn: getHotelsWithRoomsAndBookings,
    queryKey: ["hotelsWithRoomsAndBookings"],
  });
};
