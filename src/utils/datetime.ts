import { Timestamp } from "firebase/firestore/lite";
import { DateRange } from "react-day-picker";

export const DATE_FORMAT = "LLL dd, y";

// Do this in the firebase services
export const dateOrFbTimestampToDate = (
  date: Date | Timestamp | undefined
): Date | undefined => {
  return date instanceof Timestamp ? date.toDate() : date;
};

export const dateRangeOrFbTimestampToDateRange = (dateRange: {
  from: Date | Timestamp | undefined;
  to?: Date | Timestamp | undefined;
}): DateRange => {
  return {
    from: dateOrFbTimestampToDate(dateRange.from),
    to: dateOrFbTimestampToDate(dateRange.to),
  };
};
