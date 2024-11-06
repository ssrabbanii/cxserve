import { dateAtom } from "@/atoms/date";
import { useAtom } from "jotai";
import { DatePicker } from "../extension/date-picker";

export const GlobalDatePicker = () => {
  const [date, setDate] = useAtom(dateAtom);
  return (
    <DatePicker
      date={date}
      setDate={(date) => setDate(date)}
      fromDate={new Date()}
    />
  );
};
