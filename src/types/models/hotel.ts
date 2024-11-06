import { Room } from "./room";

export enum HOTEL_AMENITIES {
  FREE_WIFI = "Free WiFi",
  SWIMMING_POOL = "Swimming Pool",
  GYM = "Gym",
  SPA = "Spa",
  RESTAURANT = "Restaurant",
  BAR = "Bar",
  PARKING = "Parking",
  AIRPORT_SHUTTLE = "Airport Shuttle",
  BUSINESS_CENTER = "Business Center",
  PET_FRIENDLY = "Pet Friendly",
  ROOM_SERVICE = "Room Service",
}

// How do hotel updates and submissions (approvals/disapprovals) work?
export enum HOTEL_STATUS {
  APPROVED = "Approved",
  UNAPPROVED = "Unapproved",
  DISAPPROVED = "Disapproved",
  ARCHIVED = "Archived",
}

export interface Address {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
}

export interface Hotel {
  id: string;
  managerId: string;
  name: string;
  address: Address;
  phone?: string;
  email?: string;
  rating?: number;
  status?: HOTEL_STATUS;
  amenities: HOTEL_AMENITIES[];
  description?: string;
  images: string[];
  rooms: Partial<Room>[];
}

export interface HotelFormInput extends Hotel {
  imageFiles: File[];
}
