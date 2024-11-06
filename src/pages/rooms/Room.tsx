import { useParams } from "react-router-dom";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { RoomDetailsForm } from "./forms/RoomDetailsForm";
import { RoomStatusForm } from "./forms/RoomStatusForm";
import { RoomImagesForm } from "./forms/RoomImagesForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Formik } from "formik";
import { RoomFormInput } from "@/types/models/room";
import { useGetRoom, useUpdateRoom } from "@/services/room";
import { LoadingSpinner } from "@/components/extension/loading-spinner";
import { getEmptyRoomInput } from "@/utils/data/room";
import { Slots } from "./slots/Slots";
import { PageHeader } from "../common/PageHeader";

export const RoomPage = () => {
  const [editMode, setEditMode] = useState(false);
  const { roomId } = useParams();
  const {
    mutate: updateRoom,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateRoom(setEditMode);
  const { data: roomDetails, isLoading, isError, error } = useGetRoom(roomId!);

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
    <Formik<RoomFormInput>
      enableReinitialize
      initialValues={{
        ...getEmptyRoomInput(),
        ...roomDetails!,
      }}
      onSubmit={(values) => {
        updateRoom(values);
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
              title="Room Infomation"
              editMode={editMode}
              setEditMode={setEditMode}
              isPending={isUpdatePending}
            />
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 ">
                <RoomDetailsForm
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values}
                  setFieldValue={formik.setFieldValue}
                  editable={editMode}
                />
                <Slots
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values}
                  setFieldValue={formik.setFieldValue}
                  editable={editMode}
                />
              </div>
              <div className="grid auto-rows-max items-start gap-4">
                <RoomStatusForm
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values}
                  setFieldValue={formik.setFieldValue}
                  editable={editMode}
                />
                <RoomImagesForm
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
