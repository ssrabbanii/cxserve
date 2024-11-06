import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormikFormComponentProps } from "@/types/common/forms";
import { Hotel } from "@/types/models/hotel";


export const AddressForm: React.FC<FormikFormComponentProps<Hotel>> = ({
  values,
  onChange,
  onBlur,
  editable,
}) => {
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Address</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="addressLine1">Address Line 1</Label>
            <Input
              id="addressLine1"
              type="text"
              className="w-full"
              name="address.addressLine1" // for formik
              value={values.address.addressLine1}
              onChange={onChange}
              onBlur={onBlur}
              disabled={!editable}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input
              id="addressLine2"
              type="text"
              className="w-full"
              name="address.addressLine2" // for formik
              value={values.address.addressLine2}
              onChange={onChange}
              onBlur={onBlur}
              disabled={!editable}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="City">City</Label>
            <Input
              id="city"
              type="text"
              className="w-full"
              name="address.city" // for formik
              value={values.address.city}
              onChange={onChange}
              onBlur={onBlur}
              disabled={!editable}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="Country">Country</Label>
            <Input
              id="country"
              type="text"
              className="w-full"
              name="address.country" // for formik
              value={values.address.country}
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
