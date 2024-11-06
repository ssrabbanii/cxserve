import { ImageUploader } from "@/components/extension/ImageUploader";
import { LargeImageCarousel } from "@/components/extension/LargeImageCarousel";
import { MiniImageCarouselWithThumbs } from "@/components/extension/MiniImageCarousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FormikFormComponentProps } from "@/types/common/forms";
import { RoomFormInput } from "@/types/models/room";
import { useState } from "react";

export const RoomImagesForm: React.FC<FormikFormComponentProps<RoomFormInput>> = ({
  values,
  editable,
  setFieldValue,
}) => {
  const [openImageDisplay, setOpenImageDisplay] = useState<boolean>(false);

  return (
    <>
      <Dialog open={openImageDisplay} onOpenChange={setOpenImageDisplay}>
        <DialogContent className="w-[70vw] aspect-video">
          <LargeImageCarousel images={values.images} />
        </DialogContent>
      </Dialog>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent>
          <MiniImageCarouselWithThumbs
            images={values.images}
            setOpenImageDisplay={setOpenImageDisplay}
          />
          {editable ? (
            <ImageUploader
              files={values.imageFiles}
              setFiles={(files) => setFieldValue("imageFiles", files)}
            />
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </>
  );
};
