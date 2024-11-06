import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface ImageCarouselProps {
  images: string[];
}

export const LargeImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <Carousel className="w-full h-full">
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="p-0 flex aspect-video items-center justify-center">
                <img
                  alt="Hotel image"
                  className="aspect-video w-full rounded-md object-cover"
                  src={img}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
