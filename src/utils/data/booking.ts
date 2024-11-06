import { BOOKING_STATUS, Booking } from "@/types/models/booking";
import { HOUR } from "@/types/models/slot";
import { addDays } from "date-fns";

export const getEmptyBooking = (): Booking => ({
  id: "",
  hotelId: "",
  hotelName: "",
  roomId: "",
  roomType: "",
  guest: {
    name: "",
    email: "",
    phone: "",
  },
  dateRange: { from: new Date(), to: addDays(new Date(), 20) },
  startTime: HOUR.PM_2,
  endTime: HOUR.PM_10,
  status: BOOKING_STATUS.CONFIRMED,
  totalPrice: 0,
  currency: "BDT",
  guests: {
    adults: 0,
    children: 0,
  },
  range: true,
});
