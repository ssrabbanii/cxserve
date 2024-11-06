import { DataTable } from "@/components/extension/data-table";
import { DataTableColumnHeader } from "@/components/extension/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BOOKING_STATUS,
  Booking,
  BookingFormInput,
} from "@/types/models/booking";
import { getEmptyBooking } from "@/utils/data/booking";
import { ColumnDef } from "@tanstack/react-table";
import {
  AlertCircle,
  ExternalLink,
  MoreHorizontal,
  PlusCircle,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BookingDetailsForm } from "./forms/BookingDetailsForm";
import { GuestInfoForm } from "./forms/GuestInfoForm";
import { Formik } from "formik";
import { DateTime } from "luxon";
import { DATE_FORMAT } from "@/utils/datetime";
import { DialogProps } from "@radix-ui/react-dialog";
import { LoadingSpinner } from "@/components/extension/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useCreateBooking,
  useGetHotelsWithRoomsAndBookings,
} from "@/services/booking";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Timestamp } from "firebase/firestore/lite";
import { Hotel } from "@/types/models/hotel";

export const columns: ColumnDef<BookingFormInput>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
    cell: ({ row }) => {
      const bookingId = row.original.id;
      return (
        <NavLink to={`/bookings/${bookingId}`} className="hover:underline">
          {row.original.id}
        </NavLink>
      );
    },
  },
  {
    accessorKey: "roomType",
    header: "Room Type",
    cell: ({ row }) => {
      const roomId = row.original.roomId;
      return (
        <NavLink to={`/rooms/${roomId}`} className="hover:underline">
          {row.original.roomType}
        </NavLink>
      );
    },
  },
  {
    accessorKey: "guest.name",
    header: "Guest Name",
  },
  {
    id: "checkInDate",
    header: "Check In Date",
    cell: ({ row }) => {
      const startDate = row.original.dateRange.from! as unknown;
      const date =
        startDate instanceof Timestamp
          ? (startDate as Timestamp).toDate()
          : startDate;

      return (
        <span>{DateTime.fromJSDate(date as Date).toFormat(DATE_FORMAT)}</span>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Price" />
    ),
    cell: (props) => {
      const price = props.getValue() as number;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT",
      }).format(price);

      return formatted;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => {
      const value = props.getValue() as string;
      return <Badge variant="outline">{value}</Badge>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const bookingId = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <NavLink to={`/bookings/${bookingId}`}>
              <DropdownMenuItem className="gap-2">
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Open
                </span>
              </DropdownMenuItem>
            </NavLink>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface AddBookingModalProps extends DialogProps {
  hotel: Hotel;
  roomOptions: { label: string; value: string }[];
}

export const AddBookingModal: React.FC<AddBookingModalProps> = ({
  open,
  onOpenChange,
  hotel,
  roomOptions,
}) => {
  const {
    mutate: createBooking,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
  } = useCreateBooking();

  return (
    <Formik<BookingFormInput>
      enableReinitialize
      initialValues={{
        ...getEmptyBooking(),
        hotelId: hotel.id,
        hotelName: hotel.name,
      }}
      onSubmit={(values) => {
        createBooking({ ...values });
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[1000px]">
              <DialogHeader>
                <DialogTitle>Add New Booking</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4">
                {isCreateError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{createError.message}</AlertDescription>
                  </Alert>
                )}
                <div className="w-full flex gap-4">
                  <BookingDetailsForm
                    roomOptions={roomOptions}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    values={formik.values}
                    setFieldValue={formik.setFieldValue}
                    editable={true}
                  />
                  <GuestInfoForm
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    values={formik.values}
                    setFieldValue={formik.setFieldValue}
                    editable={true}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  {isCreatePending ? (
                    <LoadingSpinner />
                  ) : (
                    <Button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                      }}
                    >
                      Create
                    </Button>
                  )}
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      )}
    </Formik>
  );
};

interface BookingsTableProps {
  bookings: BookingFormInput[];
  bookingStatus: BOOKING_STATUS | undefined;
}

export const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  bookingStatus,
}) => {
  const filteredBookings = bookings!.filter(
    (bookings) => !bookingStatus || bookings.status === bookingStatus
  );

  return <DataTable columns={columns} data={filteredBookings} />;
};

export const Bookings = () => {
  const [selectedHotelId, setSelectedHotelId] = useState<string | undefined>();
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>();
  const [openAddBookingModal, setOpenAddBookingModal] =
    useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<BOOKING_STATUS | undefined>(
    undefined
  );

  const {
    data: hotelsWithRoomsAndBookings,
    isLoading,
    isError,
  } = useGetHotelsWithRoomsAndBookings();

  if (isLoading)
    return (
      <div className="mx-auto flex flex-col w-full">
        <LoadingSpinner />
      </div>
    );

  if (isError) {
    return (
      <div className="mx-auto flex flex-col w-full">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Error: Could not load hotels</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (hotelsWithRoomsAndBookings!.length === 0) {
    return (
      <div className="mx-auto flex flex-col w-full">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Please create a hotel/location first!
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const selectedHotelIdWithDefault =
    selectedHotelId ?? hotelsWithRoomsAndBookings![0].hotel.id;

  const hotelOptions = hotelsWithRoomsAndBookings!.map((hotelsWithRooms) => ({
    label: hotelsWithRooms.hotel.name,
    value: hotelsWithRooms.hotel.id,
  }));

  const selectedHotelWithRooms = hotelsWithRoomsAndBookings!.find(
    (hotelWithRooms) => hotelWithRooms.hotel.id == selectedHotelIdWithDefault
  )!;

  const rooms = selectedHotelWithRooms.rooms;

  // const roomOptions = [
  //   { label: "All", value: undefined },
  //   ...rooms.map((room) => ({
  //     label: room.room.type,
  //     value: room.room.id,
  //   })),
  // ];

  // const selectedRooms = rooms.filter(
  //   (room) => !selectedHotelId || room.room.id === selectedRoomId
  // );
  // const bookings = rooms.flatMap((room) => ({
  //   ...room.bookings,
  //   roomType: room.room.type
  // }));

  const roomOptions = rooms.map((room) => ({
    label: room.room.type,
    value: room.room.id,
  }));

  const bookings = rooms.flatMap((room) =>
    room.bookings.map((booking) => ({
      ...booking,
      roomType: room.room.type,
    }))
  );

  return (
    <>
      <div className="mx-auto flex flex-col w-full">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger
                value="all"
                onClick={() => setStatusFilter(undefined)}
              >
                All
              </TabsTrigger>
              {Object.values(BOOKING_STATUS).map((status) => (
                <TabsTrigger
                  key={status}
                  value={status}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              {/* room */}
              {/* <Select
                value={selectedHotelIdWithDefault}
                onValueChange={setSelectedHotelId}
              >
                <SelectTrigger
                  id="hotelId"
                  aria-label="Select hotel"
                  className="w-[250px]"
                >
                  <SelectValue placeholder="Select Hotel" />
                </SelectTrigger>
                <SelectContent>
                  {hotelOptions.map((option, i) => (
                    <SelectItem key={i} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
              <Select
                value={selectedHotelIdWithDefault}
                onValueChange={setSelectedHotelId}
              >
                <SelectTrigger
                  id="hotelId"
                  aria-label="Select hotel"
                  className="w-[250px]"
                >
                  <SelectValue placeholder="Select Hotel" />
                </SelectTrigger>
                <SelectContent>
                  {hotelOptions.map((option, i) => (
                    <SelectItem key={i} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="sm"
                className="h-8 gap-1"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenAddBookingModal(true);
                }}
                disabled={rooms!.length === 0}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Booking
                </span>
              </Button>
            </div>
          </div>
          <Card x-chunk="dashboard-06-chunk-0" className="mt-4">
            <CardHeader>
              <CardTitle>Bookings</CardTitle>
              <CardDescription>Manage your bookings</CardDescription>
            </CardHeader>
            <CardContent>
              {rooms!.length === 0 ? (
                <div className="mx-auto flex flex-col w-full">
                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                      Please create a room within the hotel/location first!
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <BookingsTable
                  bookings={bookings}
                  bookingStatus={statusFilter}
                />
              )}
            </CardContent>
          </Card>
        </Tabs>
      </div>
      <AddBookingModal
        open={openAddBookingModal}
        onOpenChange={setOpenAddBookingModal}
        hotel={selectedHotelWithRooms.hotel}
        roomOptions={roomOptions}
      />
    </>
  );
};
