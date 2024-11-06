import { ErrorAlert } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/firebase";
import { useRoomAndHotel } from "@/services/room";
// import { TimepassUser } from "@/types/models/user";
import { User } from "firebase/auth";
import { BadgeCheck, CircleUser, CreditCard } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { LoginRegistrationCard } from "../auth/LoginRegistrationCard";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PaymentMethod } from "@/components/payment/PaymentMethod";

interface IdentificationComponentProps {
  user: User | null | undefined;
}

interface PaymentComponentProps {
  user: User | null | undefined;
  paymentConfirmed: boolean;
  setPaymentConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

const IdentificationComponentLoading = () => {
  return <Skeleton className=" h-[40vh] w-full rounded-md" />;
};

const PaymentComponentLoading = () => {
  return <Skeleton className=" h-[30vh] w-full rounded-md" />;
};

const IdentificationComponent: React.FC<IdentificationComponentProps> = ({
  user,
}) => {
  if (user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-2">
            Identification <BadgeCheck color="green" />
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="flex flex-row gap-2">
          Login or sign up to book <CircleUser />
        </CardTitle>
      </CardHeader>
      <LoginRegistrationCard />
    </Card>
  );
};

const PaymentComponent: React.FC<PaymentComponentProps> = ({
  user,
  paymentConfirmed,
  setPaymentConfirmed,
}) => {
  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-2">
            Payment <CreditCard />
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <PaymentMethod
      paymentConfirmed={paymentConfirmed}
      setPaymentConfirmed={setPaymentConfirmed}
    />
  );
};

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

const ConfirmButtonSkeleton = () => {
  return <Skeleton className="w-full rounded-md" />;
};

export const ReservePage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);
  const {
    data: roomAndHotel,
    isLoading: isRoomAndHotelLoading,
    isError: isRoomAndHotelError,
  } = useRoomAndHotel(roomId!);
  const [user, isLoading, isError] = useAuthState(auth);

  if (isLoading || isRoomAndHotelLoading) {
    return (
      <div className="container py-8 space-y-8">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 ">
            <IdentificationComponentLoading />
            <PaymentComponentLoading />
          </div>
          <div className="grid auto-rows-max items-start gap-4">
            <HotelSkeletonCard />
            <ReceiptSkeletonCard />
            <ConfirmButtonSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (isRoomAndHotelError || isError) {
    return (
      <div className="container py-8 space-y-8 w-full">
        <ErrorAlert name="" message="Unable to connect to database" />
      </div>
    );
  }

  const { hotel, room } = roomAndHotel!;

  return (
    <div className="container py-8 space-y-8">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
          <IdentificationComponent user={user} />
          <PaymentComponent
            user={user}
            paymentConfirmed={paymentConfirmed}
            setPaymentConfirmed={setPaymentConfirmed}
          />
        </div>
        <div className="grid auto-rows-max items-start gap-4">
          <HotelCard {...hotel} />
          <ReceiptCard {...room} />
          <Button
            className="w-full"
            onClick={() => {
                // add booking to DB
                // get new booking ID
                // navigate to booking
                navigate(`/bookings/${roomId}`);
            }}
            disabled={!user || !paymentConfirmed}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
};
