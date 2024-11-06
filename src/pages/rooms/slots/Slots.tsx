import { DataTable } from "@/components/extension/data-table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormikFormComponentProps } from "@/types/common/forms";
import {
  HOUR,
  SlotConfig,
  WEEKDAYS,
  hourOptions,
  weekdayOptions,
} from "@/types/models/slot";
import { Room } from "@/types/models/room";
import { DialogProps } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { addDays, format } from "date-fns";
import { Formik } from "formik";
import { CalendarIcon, PlusCircle, Trash } from "lucide-react";
import { DateTime } from "luxon";
import { useState } from "react";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import { DATE_FORMAT, dateOrFbTimestampToDate } from "@/utils/datetime";

// add and display slot configs

export const columns = (
  editable: boolean,
  onDelete: (slotConfigId: string) => void
): ColumnDef<SlotConfig>[] => [
  {
    id: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = dateOrFbTimestampToDate(row.original.dateRange.from)!;
      return (
        <span>{DateTime.fromJSDate(date).toFormat(DATE_FORMAT)}</span>
      );
    },
  },
  {
    id: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = dateOrFbTimestampToDate(row.original.dateRange.to)!;
      return (
        <span>{DateTime.fromJSDate(date).toFormat(DATE_FORMAT)}</span>
      );
    },
  },
  {
    accessorKey: "weekdays",
    header: "Weekdays",
    cell: ({ row }) => {
      const weekdays = row.original.weekdays;
      if (weekdays.length === 7) {
        return <span>Every Day</span>;
      }

      if (weekdays.length === 2) {
        if (
          weekdays.includes(WEEKDAYS.FRIDAY) &&
          weekdays.includes(WEEKDAYS.SATURDAY)
        ) {
          return <span>Weekends</span>;
        }
      }

      if (weekdays.length === 5) {
        if (
          weekdays.includes(WEEKDAYS.SUNDAY) &&
          weekdays.includes(WEEKDAYS.MONDAY) &&
          weekdays.includes(WEEKDAYS.TUESDAY) &&
          weekdays.includes(WEEKDAYS.WEDNESDAY) &&
          weekdays.includes(WEEKDAYS.THURSDAY)
        ) {
          return <span>Weekdays</span>;
        }
      }

      return <span>{weekdays.join(", ")}</span>;
    },
  },
  {
    accessorKey: "startTime",
    header: "Check-in Time",
  },
  {
    accessorKey: "endTime",
    header: "Check-out Time",
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const slotConfigId = row.original.id;
      return (
        <Button
          aria-haspopup="true"
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            onDelete(slotConfigId);
          }}
          disabled={!editable}
        >
          <Trash className="h-4 w-4" />
        </Button>
      );
    },
  },
];

interface AddRoomModalProps
  extends DialogProps,
    FormikFormComponentProps<Room> {}

const AddSlotModal: React.FC<AddRoomModalProps> = ({
  open,
  onOpenChange,
  values,
  setFieldValue,
}) => {
  return (
    <Formik<SlotConfig>
      initialValues={{
        id: "",
        dateRange: { from: new Date(), to: addDays(new Date(), 20) },
        weekdays: [],
        startTime: HOUR.AM_10,
        endTime: HOUR.PM_6,
      }}
      onSubmit={(slotValues) => {
        setFieldValue("slots", [
          ...(values.slots ?? []),
          { ...slotValues, id: uuidv4() },
        ]);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Slot Config</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="w-full grid gap-3">
                  <Label>Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formik.values.dateRange && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formik.values.dateRange?.from ? (
                          formik.values.dateRange.to ? (
                            <>
                              {format(
                                formik.values.dateRange.from,
                                DATE_FORMAT
                              )}{" "}
                              -{" "}
                              {format(formik.values.dateRange.to, DATE_FORMAT)}
                            </>
                          ) : (
                            format(formik.values.dateRange.from, DATE_FORMAT)
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
                        defaultMonth={formik.values.dateRange?.from}
                        selected={formik.values.dateRange}
                        onSelect={(value) =>
                          formik.setFieldValue("dateRange", value)
                        }
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="w-full grid gap-3">
                  <Label htmlFor="status">Weekdays</Label>
                  <MultiSelector
                    values={formik.values.weekdays}
                    onValuesChange={(weekdays) => {
                      formik.setFieldValue("weekdays", weekdays);
                    }}
                    loop={false}
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {weekdayOptions.map((option, i) => (
                          <MultiSelectorItem key={i} value={option.value}>
                            {option.label}
                          </MultiSelectorItem>
                        ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                </div>
                <div className="w-full flex gap-3">
                  <div className="w-full grid gap-3">
                    <Label>Check In Time</Label>
                    <Select
                      value={formik.values.startTime}
                      onValueChange={(value) =>
                        formik.setFieldValue("startTime", value)
                      }
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
                      value={formik.values.endTime}
                      onValueChange={(value) =>
                        formik.setFieldValue("endTime", value)
                      }
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
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                  >
                    Add Slot Config
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      )}
    </Formik>
  );
};

export const Slots: React.FC<FormikFormComponentProps<Room>> = ({
  values,
  onChange,
  onBlur,
  setFieldValue,
  editable,
}) => {
  const [openAddSlotModal, setOpenAddSlotModal] = useState<boolean>(false);
  const slotColumnDefs = columns(editable, (slotConfigId: string) => {
    setFieldValue(
      "slots",
      values.slots?.filter((slot) => slot.id !== slotConfigId) ?? []
    );
  });
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Slots</CardTitle>
          {editable ? (
            <Button
              size="sm"
              className="gap-1"
              onClick={(e) => {
                e.preventDefault();
                setOpenAddSlotModal(true);
              }}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Slots
              </span>
            </Button>
          ) : (
            <></>
          )}
        </CardHeader>
        <CardContent>
          <DataTable columns={slotColumnDefs} data={values.slots ?? []} />
        </CardContent>
      </Card>
      <AddSlotModal
        open={openAddSlotModal}
        onOpenChange={setOpenAddSlotModal}
        values={values}
        onBlur={onBlur}
        onChange={onChange}
        setFieldValue={setFieldValue}
        editable={true}
      />
    </>
  );
};
