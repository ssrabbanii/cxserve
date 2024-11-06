import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik } from "formik";
import { LoadingSpinner } from "@/components/extension/loading-spinner";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  ErrorAlert,
} from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useRegisterUser } from "@/services/auth";
import { emptyUser } from "@/utils/data/user";

// Add form validations

interface RegistrationFormProps {
  redirect?: Boolean;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  redirect = true,
}) => {
  const {
    mutate: registerUser,
    isPending,
    isError,
    error,
  } = useRegisterUser(redirect);

  return (
    <>
      {isError && <ErrorAlert name={error.name} message={error.message} />}
      <Formik
        initialValues={{ ...emptyUser, password: "", comfirmPassword: "" }}
        onSubmit={(values) => registerUser(values)}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="comfirmPassword">Confirm Password</Label>
                <Input
                  id="comfirmPassword"
                  type="comfirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.comfirmPassword}
                  required
                />
              </div>
              {/* Add a confirm password */}
              {isPending ? (
                <LoadingSpinner />
              ) : (
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
              )}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
