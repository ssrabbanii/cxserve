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
import { HOTEL_AMENITIES, Hotel } from "@/types/models/hotel";

const amenitiesOptions = Object.values(HOTEL_AMENITIES).map((key) => ({
  label: key,
  value: key,
}));

export const DetailsForm: React.FC<FormikFormComponentProps<Hotel>> = ({
  values,
  onChange,
  onBlur,
  setFieldValue,
  editable,
}) => {
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              value={values.name}
              onChange={onChange}
              onBlur={onBlur}
              disabled={!editable}
            />
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
