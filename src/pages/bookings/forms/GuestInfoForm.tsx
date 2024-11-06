import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormikFormComponentProps } from "@/types/common/forms";
import { Booking } from "@/types/models/booking";

export const GuestInfoForm: React.FC<FormikFormComponentProps<Booking>> = ({
  values,
  onChange,
  onBlur,
  editable,
}) => {
  return (
    <Card className="w-full gap-3">
      <CardHeader>
        <CardTitle>Guest Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="w-full grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="string"
              className="w-full"
              name="guest.name" // for formik
              value={values.guest.name}
              onChange={onChange}
              onBlur={onBlur}
              disabled={!editable}
            />
          </div>
          <div className="w-full grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="w-full"
              name="guest.email" // for formik
              value={values.guest.email}
              onChange={onChange}
              onBlur={onBlur}
              disabled={!editable}
            />
          </div>
          <div className="w-full grid gap-3">
            <Label htmlFor="phone">Phone No.</Label>
            <Input
              id="phone"
              type="text"
              className="w-full"
              name="guest.phone" // for formik
              value={values.guest.phone}
              onChange={onChange}
              onBlur={onBlur}
              disabled={!editable}
            />
            {/* <PhoneInput /> */}
          </div>
          <div className="w-full flex gap-3">
            <div className="w-full grid gap-3">
              <Label>Adults</Label>
              <Input
                type="number"
                className="w-full"
                min={0}
                name="guests.adults" // for formik
                value={values.guests.adults}
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
                name="guests.children" // for formik
                value={values.guests.children}
                onChange={onChange}
                onBlur={onBlur}
                disabled={!editable}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
