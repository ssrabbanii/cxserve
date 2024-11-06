import { ErrorAlert } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoomAndHotel } from "@/services/room";
import { useParams } from "react-router-dom";
import { Hotel } from "@/types/models/hotel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HotelStars } from "@/components/extension/stars";
import { useAtom } from "jotai";
import { dateAtom } from "@/atoms/date";
import { format } from "date-fns";
import { Room } from "@/types/models/room";
import { BadgeCheck } from "lucide-react";

const HotelSkeletonCard = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Skeleton className="w-full aspect-square rounded-md" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[50%]" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
    </div>
  );
};

const HotelCard: React.FC<Hotel> = ({ id, name, images, rating }) => {
  const [date] = useAtom(dateAtom);
  return (
    <Card className="shadow-none grid grid-cols-2">
      <CardContent className="p-4">
        <Carousel>
          <CarouselContent>
            {images?.length > 0 ? (
              images.map((img, index) => (
                <CarouselItem key={index}>
                  <img
                    alt="Hotel image"
                    className="aspect-square w-full rounded-md object-cover"
                    src={img}
                  />
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <Skeleton className="aspect-square w-full rounded-md" />
              </CarouselItem>
            )}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
      <CardContent className="p-4 px-0 space-y-1 ">
        <div className="text-lg font-medium">{name}</div>
        <HotelStars rating={rating!} size={16} />
        <div className="text-sm font-medium">{format(date!, "PPP")}</div>
        <div className="text-sm font-medium">{"10am to 6pm"}</div>
      </CardContent>
    </Card>
  );
};

const ReceiptSkeletonCard = () => {
  return <Skeleton className="w-full h-[15vh] rounded-md" />;
};

const ReceiptCard: React.FC<Room> = ({ type, price }) => {
  return (
    <Card>
      <CardContent className="m-4 border-b p-0 pb-4 space-y-1">
        <div className="flex flex-row justify-between">
          <div className="text-lg font-medium">Price Details</div>
        </div>
      </CardContent>
      <CardContent className="m-4 my-1 p-0 space-y-1">
        <div className="flex flex-row justify-between">
          <div className="text-md font-medium">{type}</div>
          <div className="text-sm font-medium my-auto">{`${price} BDT`}</div>
        </div>
      </CardContent>
      <CardContent className="m-4 my-0 p-0 pb-4 space-y-1">
        <div className="flex flex-row justify-between">
          <div className="text-md font-bold">Total</div>
          <div className="text-sm font-bold my-auto">{`${price} BDT`}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export const BookingPage = () => {
  const { bookingId } = useParams();
  const {
    data: roomAndHotel,
    isLoading: isRoomAndHotelLoading,
    isError: isRoomAndHotelError,
  } = useRoomAndHotel(bookingId!);

  if (isRoomAndHotelLoading) {
    return (
      <div className="container py-8 space-y-8">
        <div className="w-[400px] mx-auto ">
          <HotelSkeletonCard />
          <ReceiptSkeletonCard />
        </div>
      </div>
    );
  }

  if (isRoomAndHotelError) {
    return (
      <div className="container py-8 space-y-8 w-full">
        <ErrorAlert name="" message="Unable to connect to database" />
      </div>
    );
  }

  const { hotel, room } = roomAndHotel!;

  return (
    <div className="container py-8">
      <div className="w-[400px] mx-auto space-y-4">
        <CardTitle className="flex flex-row gap-2 border-b py-4 my-2">
          Booking confirmed <BadgeCheck color="green" />
        </CardTitle>
        <HotelCard {...hotel} />
        <ReceiptCard {...room} />
      </div>
    </div>
  );
};
