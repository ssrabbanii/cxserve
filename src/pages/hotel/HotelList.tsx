import { HotelStars } from "@/components/extension/stars";
import { ErrorAlert } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useHotels } from "@/services/hotel";
import { Hotel } from "@/types/models/hotel";
import { NavLink } from "react-router-dom";

export const HotelSkeletonCard = () => {
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

const HotelCard: React.FC<Hotel> = ({ id, name, images, rating }) => {
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0 border-0">
        <Carousel>
          <NavLink
            to={`/hotels/${id}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
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
          </NavLink>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
      <NavLink
        to={`/hotels/${id}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <CardContent className="my-2 px-0 space-y-1 border-x-transparent">
          <div className="text-lg font-medium">{name}</div>
          <HotelStars rating={rating!} size={16} />
          <div className="text-sm font-medium">{"10am to 6pm"}</div>
          {/* <div className="text-sm font-medium">{"From 500 BDT"}</div> */}
        </CardContent>
      </NavLink>
    </Card>
  );
};

export const HotelList = () => {
  const { data: hotels, isLoading, isError, error } = useHotels();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {[...Array(4).keys()].map((i) => (
          <HotelSkeletonCard key={i} />
        ))}
      </div>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      {hotels!.map((hotel, i) => (
        <HotelCard key={i} {...hotel} />
      ))}
    </div>
  );
};
