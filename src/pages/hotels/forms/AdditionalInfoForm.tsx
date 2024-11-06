// import { PhoneInput } from "@/components/extension/phoneInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormikFormComponentProps } from "@/types/common/forms";
import { Hotel } from "@/types/models/hotel";

export const AdditionalInfoForm: React.FC<FormikFormComponentProps<Hotel>> = ({
  values,
  onChange,
  onBlur,
  editable,
}) => {
  return (
    <Card x-chunk="dashboard-07-chunk-3">
      <CardHeader>
        <CardTitle>Additional Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="w-full"
              value={values.email}
              onChange={onChange}
              onBlur={onBlur}
              disabled={!editable}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phone">Phone No.</Label>
            <Input
              id="phone"
              type="text"
              className="w-full"
              value={values.phone}
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
