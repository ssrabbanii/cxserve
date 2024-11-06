import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormikFormComponentProps } from "@/types/common/forms";
import { ROOM_AMENITIES, RoomFormInput } from "@/types/models/room";

const amenitiesOptions = Object.values(ROOM_AMENITIES).map((key) => ({
  label: key,
  value: key,
}));

export const RoomDetailsForm: React.FC<
  FormikFormComponentProps<RoomFormInput>
> = ({ values, onChange, onBlur, setFieldValue, editable }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="hotelName">Hotel Name</Label>
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
          <div className="grid gap-3">
            <Label htmlFor="type">Type</Label>
            <Input
              id="type"
              type="text"
              className="w-full"
              value={values.type}
              onChange={onChange}
              onBlur={onBlur}
              disabled={!editable}
            />
          </div>
          <div className="w-full flex gap-3">
            <div className="w-full grid gap-3">
              <Label>Adults</Label>
              <Input
                type="number"
                className="w-full"
                min={0}
                name="occupancy.adults" // for formik
                value={values.occupancy.adults}
                onChange={onChange}
                onBlur={onBlur}
                disabled={!editable}
              />
            </div>
            <div className="w-full grid gap-3">
              <Label>Children</Label>
              <Input
                id="children"
                type="number"
                className="w-full"
                min={0}
                name="occupancy.children" // for formik
                value={values.occupancy.children}
                onChange={onChange}
                onBlur={onBlur}
                disabled={!editable}
              />
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="status">Amenities</Label>
            <MultiSelector
              values={values.amenities}
              onValuesChange={(amenities) => {
                setFieldValue("amenities", amenities);
              }}
              loop={false}
              disabled={!editable}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {amenitiesOptions.map((option, i) => (
                    <MultiSelectorItem key={i} value={option.value}>
                      {option.label}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="min-h-32"
              value={values.description}
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
