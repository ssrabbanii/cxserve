import { Button } from "@/components/ui/button";
import { DetailsForm } from "./forms/DetailsForm";
import { AdditionalInfoForm } from "./forms/AdditionalInfoForm";
import { ImagesForm } from "./forms/ImagesForm";
import { AddressForm } from "./forms/AddressForm";
import { useState } from "react";
import { AlertCircle, ClipboardX, Edit, Save } from "lucide-react";
import { Formik } from "formik";
import { HotelFormInput } from "@/types/models/hotel";
import { useParams } from "react-router-dom";
import { useGetHotel, useUpdateHotel } from "@/services/hotel";
import { LoadingSpinner } from "@/components/extension/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getEmptyHotelInput } from "@/utils/data/hotel";

interface HotelPageHeaderProps {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  isPending: boolean;
}

const HotelPageHeader: React.FC<HotelPageHeaderProps> = ({
  editMode,
  setEditMode,
  isPending,
}) => {
  return (
    <div className="flex items-center gap-4 h-10">
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight">
        Hotel Information
      </h1>
      {isPending ? (
        <div className="items-center gap-2 ml-auto flex">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="items-center gap-2 md:ml-auto flex">
          {editMode ? (
            <>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={(e) => {
                    // reset to original values here
                    e.preventDefault();
                    setEditMode(false);
                  }}
                >
                  <ClipboardX className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Discard
                  </span>
                </Button>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="h-8 gap-1" type="submit">
                  <Save className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Save
                  </span>
                </Button>
              </div>
            </>
          ) : (
            <div className="ml-auto flex items-center gap-2">
              <Button
                size="sm"
                className="h-8 gap-1"
                onClick={(e) => {
                  e.preventDefault();
                  setEditMode(true);
                }}
              >
                <Edit className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Edit
                </span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const HotelPage = () => {
  const [editMode, setEditMode] = useState(false);
  const { hotelId } = useParams();
  const {
    mutate: updateHotel,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateHotel(setEditMode);

  const {
    data: hotelDetails,
    isLoading,
    isError,
    error,
  } = useGetHotel(hotelId!);

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
    <Formik<HotelFormInput>
      enableReinitialize
      initialValues={{ ...getEmptyHotelInput(), ...hotelDetails! }}
      onSubmit={(values) => {
        updateHotel(values);
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
            <HotelPageHeader
              editMode={editMode}
              setEditMode={setEditMode}
              isPending={isUpdatePending}
            />
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 ">
                <DetailsForm
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values}
                  setFieldValue={formik.setFieldValue}
                  editable={editMode}
                />
                <AddressForm
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values}
                  setFieldValue={formik.setFieldValue}
                  editable={editMode}
                />
              </div>
              <div className="grid auto-rows-max items-start gap-4">
                <AdditionalInfoForm
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values}
                  setFieldValue={formik.setFieldValue}
                  editable={editMode}
                />
                <ImagesForm
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
