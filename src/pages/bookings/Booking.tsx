import { useParams } from "react-router-dom";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { BookingDetailsForm } from "./forms/BookingDetailsForm";
import { GuestInfoForm } from "./forms/GuestInfoForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Formik } from "formik";
import { BookingFormInput } from "@/types/models/booking";
import { LoadingSpinner } from "@/components/extension/loading-spinner";
import { useGetBooking, useUpdateBooking } from "@/services/booking";
import { PageHeader } from "../common/PageHeader";

export const BookingPage = () => {
  const [editMode, setEditMode] = useState(false);
  const { bookingId } = useParams();

  const {
    mutate: updateBooking,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateBooking(setEditMode);

  const {
    data: bookingDetails,
    isLoading,
    isError,
    error,
  } = useGetBooking(bookingId!);

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

  return (
    <Formik<BookingFormInput>
      enableReinitialize
      initialValues={{
        ...bookingDetails!,
      }}
      onSubmit={(values) => {
        updateBooking(values);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full flex flex-col gap-4">
            {isUpdateError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{updateError.message}</AlertDescription>
              </Alert>
            )}
            <PageHeader
              title="Booking Infomation"
              editMode={editMode}
              setEditMode={setEditMode}
              isPending={isUpdatePending}
            />
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 ">
                <BookingDetailsForm
                  roomOptions={[
                    {
                      label: bookingDetails!.roomType,
                      value: bookingDetails!.roomId,
                    },
                  ]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values}
                  setFieldValue={formik.setFieldValue}
                  editable={editMode}
                />
              </div>
              <div className="grid auto-rows-max items-start gap-4">
                <GuestInfoForm
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values}
                  setFieldValue={formik.setFieldValue}
                  editable={editMode}
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
