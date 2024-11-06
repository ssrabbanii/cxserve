import { DateRange } from "react-day-picker";

export enum WEEKDAYS {
  SUNDAY = "Sun",
  MONDAY = "Mon",
  TUESDAY = "Tues",
  WEDNESDAY = "Wed",
  THURSDAY = "Thu",
  FRIDAY = "Fri",
  SATURDAY = "Sat",
}

export const weekdayOptions = Object.values(WEEKDAYS).map((key) => ({
  label: key,
  value: key,
}));

export enum HOUR {
  AM_12 = "12:00 AM",
  AM_1 = "1:00 AM",
  AM_2 = "2:00 AM",
  AM_3 = "3:00 AM",
  AM_4 = "4:00 AM",
  AM_5 = "5:00 AM",
  AM_6 = "6:00 AM",
  AM_7 = "7:00 AM",
  AM_8 = "8:00 AM",
  AM_9 = "9:00 AM",
  AM_10 = "10:00 AM",
  AM_11 = "11:00 AM",
  PM_12 = "12:00 PM",
  PM_1 = "1:00 PM",
  PM_2 = "2:00 PM",
  PM_3 = "3:00 PM",
  PM_4 = "4:00 PM",
  PM_5 = "5:00 PM",
  PM_6 = "6:00 PM",
  PM_7 = "7:00 PM",
  PM_8 = "8:00 PM",
  PM_9 = "9:00 PM",
  PM_10 = "10:00 PM",
  PM_11 = "11:00 PM",
}

export const hourOptions = Object.values(HOUR).map((key) => ({
  label: key,
  value: key,
}));

export interface SlotConfig {
  id: string;
  dateRange: DateRange;
  weekdays: WEEKDAYS[];
  startTime: HOUR;
  endTime: HOUR;
}

export interface Slot {
  date: Date;
  slotConfig: SlotConfig;
}
