import { ErrorAlert } from "@/components/ui/alert";
import { PageHeader, PageHeaderLoading } from "@/components/header/PageHeader";
import { useHotel } from "@/services/hotel";
import { useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { RoomsList } from "../room/RoomList";

interface HeroProps {
  images: string[];
}

export const HeroHotel = () => {};

export const HeroRoom = () => {};

export const HeroDefaultLoading = () => {
  return <Skeleton className=" h-[50vh] w-full rounded-md" />;
};
export const HeroDefault: React.FC<HeroProps> = ({ images }) => {
  return (
    <Carousel>
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <img
              alt="Hotel image"
              className="h-[50vh] w-full rounded-md object-cover"
              src={img}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export const HotelPage = () => {
  const { hotelId } = useParams();

  const { data: hotel, isLoading, isError, error } = useHotel(hotelId!);

  if (isLoading) {
    return (
      <div className="container py-8 space-y-8">
        <PageHeaderLoading />
        <HeroDefaultLoading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-8 space-y-8 w-full">
        <ErrorAlert {...error} />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <PageHeader title={hotel!.name} />
      <HeroDefault images={hotel!.images} />
      <RoomsList />
    </div>
  );
};
