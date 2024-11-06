import { ErrorAlert } from "@/components/ui/alert";
import { useNavigate, useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRooms } from "@/services/room";
import { Room } from "@/types/models/room";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import React from "react";

export const RoomCard: React.FC<Room> = ({
  id,
  type,
  images,
  description,
  price,
}) => {
  const navigate = useNavigate();
  return (
    <Card className="rounded-md shadow-lg dark:shadow-accent">
      <CardContent className="p-0 border-0">
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

      <CardContent className="m-4 border-b p-0 pb-4 space-y-1">
        <div className="flex flex-row justify-between">
          <div className="text-lg font-medium">{type}</div>
          <div className="text-sm font-medium my-auto">{`${
            price ?? "****"
          } BDT`}</div>
        </div>
      </CardContent>

      <CardContent className="m-4 p-0 space-y-1">
        <div className="text-sm font-medium">{"10am to 6pm"}</div>
      </CardContent>

      <CardFooter className="m-4 mt-2 p-0">
        <Button
          onClick={() => navigate(`/reserve/${id}`)}
          variant="secondary"
          className="w-full"
        >
          Reserve
        </Button>
      </CardFooter>
    </Card>
  );
};

const RoomSkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="w-full aspect-square rounded-md" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[50%]" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
    </div>
  );
};

export const RoomsList = () => {
  const { hotelId } = useParams();
  const { data: rooms, isLoading, isError, error } = useRooms(hotelId!);

  if (isLoading) {
    return (
      <>
        <h2 className="border-b pb-2 text-2xl font-medium">Rooms</h2>
        <div className="grid grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <RoomSkeletonCard key={index} />
          ))}
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex flex-col w-full">
        <ErrorAlert {...error} />
      </div>
    );
  }

  return (
    <>
      <h2 className="border-b pb-2 text-2xl font-medium">Rooms</h2>
      <div className="grid grid-cols-4 gap-8">
        {rooms!.map((room) => (
          <RoomCard key={room.id} {...room} />
        ))}
      </div>
    </>
  );
};
