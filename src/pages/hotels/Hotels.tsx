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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/firebase";
import { useCreateHotel, useGetHotels } from "@/services/hotel";
import { HOTEL_STATUS, Hotel } from "@/types/models/hotel";
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
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const columns: ColumnDef<Hotel>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const hotelId = row.original.id;
      return (
        <NavLink to={`/hotels/${hotelId}`} className="hover:underline">
          {row.original.name}
        </NavLink>
      );
    },
  },
  {
    accessorKey: "address.city",
    header: "City",
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
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
      const hotelId = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <NavLink to={`/hotels/${hotelId}`}>
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

export const AddHotelModal: React.FC<DialogProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    mutate: createHotel,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
  } = useCreateHotel();

  const manager = auth.currentUser;

  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={(values) => createHotel({ ...values, managerId: manager!.uid })}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Hotel</DialogTitle>
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
                  <Label htmlFor="name">Hotel Name</Label>
                  <Input
                    id="name"
                    type="string"
                    className="w-full"
                    value={formik.values.name}
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

export const Hotels = () => {
  const [openAddHotelModal, setOpenAddHotelModel] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<HOTEL_STATUS | undefined>(
    undefined
  );

  const { data: hotels, isLoading, isError, error } = useGetHotels();

  if (isLoading) {
    return (
      <div className="mx-auto my-auto flex flex-col w-full">
        <LoadingSpinner />
      </div>
    );
  }

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

  const filteredHotels = hotels!.filter(
    (hotel) => !statusFilter || hotel.status === statusFilter
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
              {Object.values(HOTEL_STATUS).map((status) => (
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
              <Button
                size="sm"
                className="h-8 gap-1"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenAddHotelModel(true);
                }}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  New Hotel
                </span>
              </Button>
            </div>
          </div>
          <Card x-chunk="dashboard-06-chunk-0" className="mt-4">
            <CardHeader>
              <CardTitle>Hotels</CardTitle>
              <CardDescription>Manage your hotels</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={filteredHotels} />
            </CardContent>
          </Card>
        </Tabs>
      </div>
      <AddHotelModal
        open={openAddHotelModal}
        onOpenChange={setOpenAddHotelModel}
      />
    </>
  );
};
