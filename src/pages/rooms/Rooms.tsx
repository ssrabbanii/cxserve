import { DataTable } from "@/components/extension/data-table";
import { DataTableColumnHeader } from "@/components/extension/data-table-column-header";
import { LoadingSpinner } from "@/components/extension/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useCreateRoom,
  useGetHotelsWithRooms,
} from "@/services/room";
import { ROOM_STATUS, Room } from "@/types/models/room";
import { DialogProps } from "@radix-ui/react-dialog";

import { ColumnDef } from "@tanstack/react-table";
import { Formik } from "formik";
import {
  AlertCircle,
  Archive,
  ExternalLink,
  ImageOff,
  MoreHorizontal,
  PlusCircle,
  Terminal,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "images",
    header: "",
    cell: (props) =>
      (props.getValue() as string[])?.length ? (
        <img
          alt="Product img"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={(props.getValue() as string[])[0]}
          width="64"
        />
      ) : (
        <ImageOff size={64} />
      ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const roomId = row.original.id;
      return (
        <NavLink to={`/rooms/${roomId}`} className="hover:underline">
          {row.original.type}
        </NavLink>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: (props) => {
      const price = props.getValue() as number;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT",
      }).format(price);

      return price ? formatted : undefined;
    },
  },
  {
    accessorKey: "qty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
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
      const roomId = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <NavLink to={`/rooms/${roomId}`}>
              <DropdownMenuItem className="gap-2">
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Open
                </span>
              </DropdownMenuItem>
            </NavLink>
            <DropdownMenuItem className="gap-2" disabled>
              <Archive className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Archive
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2" disabled>
              <Trash2 className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Delete
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface AddRoomModalProps extends DialogProps {
  hotelId: string;
}

export const AddRoomModal: React.FC<AddRoomModalProps> = ({
  open,
  onOpenChange,
  hotelId,
}) => {
  const {
    mutate: createRoom,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
  } = useCreateRoom();

  return (
    <Formik
      initialValues={{ type: "" }}
      onSubmit={(values) => createRoom({ ...values, hotelId: hotelId })}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Room</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {isCreateError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{createError.message}</AlertDescription>
                  </Alert>
                )}
                <div className="w-full grid gap-3">
                  <Label htmlFor="type">Room Type</Label>
                  <Input
                    id="type"
                    type="string"
                    className="w-full"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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

interface RoomsTableProps {
  rooms: Room[];
  roomStatus: ROOM_STATUS | undefined;
}

export const RoomsTable: React.FC<RoomsTableProps> = ({
  rooms,
  roomStatus,
}) => {
  const filteredRooms = rooms!.filter(
    (room) => !roomStatus || room.status === roomStatus
  );

  return <DataTable columns={columns} data={filteredRooms} />;
};

export const Rooms = () => {
  const [selectedHotelId, setSelectedHotelId] = useState<string | undefined>();
  const [openAddRoomModal, setOpenAddRoomModel] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<ROOM_STATUS | undefined>(
    undefined
  );

  const { data: hotelsWithRooms, isLoading, isError, error } = useGetHotelsWithRooms();

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
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (hotelsWithRooms!.length === 0) {
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
    selectedHotelId ?? hotelsWithRooms![0].hotel.id;

  const hotelOptions = hotelsWithRooms!.map((hotelsWithRooms) => ({
    label: hotelsWithRooms.hotel.name,
    value: hotelsWithRooms.hotel.id,
  }));

  const selectedHotelWithRooms = hotelsWithRooms!.find(
    (hotelWithRooms) => hotelWithRooms.hotel.id == selectedHotelIdWithDefault
  )!;

  const rooms = selectedHotelWithRooms.rooms;

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
              {Object.values(ROOM_STATUS).map((status) => (
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
              {/* specify width */}
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
                  setOpenAddRoomModel(true);
                }}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  New Room
                </span>
              </Button>
            </div>
          </div>
          <Card x-chunk="dashboard-06-chunk-0" className="mt-4">
            <CardHeader>
              <CardTitle>Rooms</CardTitle>
              <CardDescription>Manage your rooms</CardDescription>
            </CardHeader>
            <CardContent>
              <RoomsTable rooms={rooms} roomStatus={statusFilter} />
            </CardContent>
          </Card>
        </Tabs>
      </div>
      <AddRoomModal
        open={openAddRoomModal}
        onOpenChange={setOpenAddRoomModel}
        hotelId={selectedHotelIdWithDefault}
      />
    </>
  );
};
