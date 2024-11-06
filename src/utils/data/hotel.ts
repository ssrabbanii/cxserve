import { Address, HOTEL_STATUS, HotelFormInput } from "@/types/models/hotel";

export const getEmptyAddress = (): Address => ({
  addressLine1: "",
  addressLine2: "",
  city: "",
  country: "",
});

export const getEmptyHotelInput = (): HotelFormInput => ({
  id: "",
  managerId: "",
  name: "",
  address: getEmptyAddress(),
  phone: "",
  email: "",
  status: HOTEL_STATUS.UNAPPROVED,
  amenities: [],
  description: "",
  images: [],
  imageFiles: [],
  rooms: [],
});
