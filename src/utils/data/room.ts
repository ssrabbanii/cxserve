import { ROOM_STATUS, RoomFormInput } from "@/types/models/room";

export const getEmptyRoomInput = () : RoomFormInput => ({
    id: "",
    hotelId: "",
    type: "",
    description: "",
    price: 0,
    qty: 0,
    status: ROOM_STATUS.DRAFT,
    currency: "",
    amenities: [],
    images: [],
    imageFiles: [],
    occupancy: {
        adults: 0,
        children: 0
    },
    hotelName: "",
    slots: []
})