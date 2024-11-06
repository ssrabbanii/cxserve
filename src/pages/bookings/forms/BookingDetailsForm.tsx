import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { FormikFormComponentProps } from "@/types/common/forms";
import { BookingFormInput } from "@/types/models/booking";
import { hourOptions } from "@/types/models/slot";
import { DATE_FORMAT } from "@/utils/datetime";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface AddBookingFormProps extends FormikFormComponentProps<BookingFormInput> {
  roomOptions: { label: string; value: string }[];
}

export const BookingDetailsForm: React.FC<AddBookingFormProps> = ({
  values,
  onChange,
  onBlur,
  setFieldValue,
  roomOptions,
  editable,
}) => {

  return (
    <Card className="w-full gap-3">
      <CardHeader>
        <CardTitle>Booking Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="type">Hotel Name</Label>
            <Input
              id="hotelName"
              type="text"
              className="w-full"
              value={values.hotelName}
              onChange={onChange}
              onBlur={onBlur}
              disabled={true}
            />
          </div>
          <div className="w-full grid gap-3">
            <Label htmlFor="room">Room</Label>
            <Select
              value={values.roomId}
              onValueChange={(value) => setFieldValue("roomId", value)}
              disabled={!editable}
            >
              <SelectTrigger id="room" aria-label="Select room">
                <SelectValue placeholder="Select room" />
              </SelectTrigger>
              <SelectContent>
                {roomOptions.map((option, i) => (
                  <SelectItem key={i} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full grid gap-3">
            <div className="w-full flex items-center justify-between">
              <Label>Date</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="date-range"
                  checked={values.range}
                  onCheckedChange={(value) => setFieldValue("range", value)}
                  disabled={!editable}
                />
                <Label>Range</Label>
              </div>
            </div>
            {!values.range ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !values.dateRange && "text-muted-foreground"
                    )}
                    disabled={!editable}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {values.dateRange.from ? (
                      format(values.dateRange.from, DATE_FORMAT)
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={values.dateRange.from}
                    onSelect={(value) =>
                      setFieldValue("dateRange", { from: value, to: value })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !values.dateRange && "text-muted-foreground"
                    )}
                    disabled={!editable}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {values.dateRange?.from ? (
                      values.dateRange.to ? (
                        <>
                          {format(values.dateRange.from, DATE_FORMAT)} -{" "}
                          {format(values.dateRange.to, DATE_FORMAT)}
                        </>
                      ) : (
                        format(values.dateRange.from, DATE_FORMAT)
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={values.dateRange?.from}
                    selected={values.dateRange}
                    onSelect={(value) => setFieldValue("dateRange", value)}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="w-full flex gap-3">
            <div className="w-full grid gap-3">
              <Label>Check In Time</Label>
              <Select
                value={values.startTime}
                onValueChange={(value) => setFieldValue("startTime", value)}
                disabled={!editable}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hourOptions.map((option, i) => (
                    <SelectItem key={i} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full grid gap-3">
              <Label>Check Out Time</Label>
              <Select
                value={values.endTime}
                onValueChange={(value) => setFieldValue("endTime", value)}
                disabled={!editable}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hourOptions.map((option, i) => (
                    <SelectItem key={i} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full grid gap-3">
            <Label htmlFor="price">Total Price</Label>
            <Input
              id="totalPrice"
              type="number"
              min={0}
              value={values.totalPrice}
              onChange={onChange}
              onBlur={onBlur}
              disabled={!editable}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
