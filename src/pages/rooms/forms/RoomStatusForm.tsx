// import { PhoneInput } from "@/components/extension/phoneInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormikFormComponentProps } from "@/types/common/forms";
import { ROOM_STATUS, Room } from "@/types/models/room";

const statusOptions = Object.values(ROOM_STATUS).map((key) => ({
  label: key,
  value: key,
}));

export const RoomStatusForm: React.FC<FormikFormComponentProps<Room>> = ({
  values,
  onChange,
  onBlur,
  setFieldValue,
  editable,
}) => {
  return (
    <Card x-chunk="dashboard-07-chunk-3">
      <CardHeader>
        <CardTitle>Room Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              className="w-full"
              min={0}
              value={values.price}
              onChange={onChange}
              onBlur={onBlur}
              disabled={!editable}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="qty">Quantity</Label>
            <Input
              id="qty"
              type="number"
              className="w-full"
              min={0}
              value={values.qty}
              onChange={onChange}
              onBlur={onBlur}
              disabled={!editable}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>
            <Select
              value={values.status}
              onValueChange={(value) => setFieldValue("status", value)}
              disabled={!editable}
            >
              <SelectTrigger id="status" aria-label="Select status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option, i) => (
                  <SelectItem key={i} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
