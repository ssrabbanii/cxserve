import { Star } from "lucide-react";
import { useTheme } from "../theme-provider";

interface StarsInterface {
  rating: number;
  size?: number;
}

export const HotelStars: React.FC<StarsInterface> = ({ rating, size }) => {
  const { theme } = useTheme();
  return (
    <div className="flex gap-1">
      {[...Array(rating).keys()].map((i) => {
        return <Star size={size} key={i} fill={theme === "light" ? "black" : "white"} strokeWidth={0} />;
      })}
    </div>
  );
};
