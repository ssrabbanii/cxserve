import { SlotConfig } from "./slot";

export enum ROOM_AMENITIES {
  KING_BED = "King Bed",
  QUEEN_BED = "Queen Bed",
  FREE_WIFI = "Free WiFi",
  MINI_BAR = "Mini Bar",
  AIR_CONDITIONING = "Air Conditioning",
  BALCONY = "Balcony",
  KITCHENETTE = "Kitchenette",
  PRIVATE_POOL = "Private Pool",
  FLAT_SCREEN_TV = "Flat Screen TV",
  COFFEE_MAKER = "Coffee Maker",
  ROOM_SERVICE = "Room Service",
}

export enum ROOM_STATUS {
  ACTIVE = "Active",
  DRAFT = "Draft",
  ARCHIVED = "Archived",
}

export interface Room {
  id: string;
  hotelId: string;
  type: string;
  description: string;
  price: number;
  qty: number;
  status: ROOM_STATUS;
  currency: string;
  amenities: ROOM_AMENITIES[];
  images: string[];
  occupancy: {
    adults: number;
    children: number;
  };
  slots: SlotConfig[];
  hotelName: string;
}

export interface RoomFormInput extends Room {
  imageFiles: File[];
}
