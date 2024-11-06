import { HOUR } from "./slot";
import { DateRange } from "react-day-picker";
import { TimepassUser } from "./user";

export enum BOOKING_STATUS {
  CONFIRMED = "Confirmed",
  // CANCELLED = "Cancelled",
  // CHECKED_IN = "Checked In",
  // CHECKED_OUT = "Checked Out",
  // PENDING = "Pending",
}

export interface Booking {
  id: string;
  hotelId: string;
  roomId: string;
  guest: Partial<TimepassUser>;
  dateRange: DateRange;
  startTime: HOUR;
  endTime: HOUR;
  status: BOOKING_STATUS;
  totalPrice: number;
  currency: string;
  guests: {
    adults: number;
    children: number;
  };
  hotelName: string;
  roomType: string;
  range: boolean;
}

export interface BookingFormInput extends Booking {}
