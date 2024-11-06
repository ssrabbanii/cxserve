import {
  Carousel,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from "./carousel-2";

interface MiniImageCarouselProps {
  images: string[];
  setOpenImageDisplay: (open: boolean) => void;
}

export const MiniImageCarouselWithThumbs: React.FC<MiniImageCarouselProps> = ({
  images,
  setOpenImageDisplay,
}) => {
  return (
    <Carousel orientation="horizontal">
      <CarouselMainContainer>
        {images.map((img, index) => (
          <SliderMainItem key={index}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenImageDisplay(true);
              }}
            >
              <img
                alt="Hotel image"
                className="aspect-square rounded-md object-cover"
                src={img}
              />
            </button>
          </SliderMainItem>
        ))}
      </CarouselMainContainer>
      <CarouselThumbsContainer>
        {images.map((img, index) => (
          <SliderThumbItem key={index} index={index}>
            <img
              alt="Hotel image"
              className="aspect-square w-full rounded-md object-cover"
              src={img}
            />
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
};
