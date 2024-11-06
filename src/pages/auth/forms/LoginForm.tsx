import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink } from "react-router-dom";
import { useSignInUser } from "@/services/auth";
import { Formik } from "formik";
import { Alert, AlertDescription, AlertTitle, ErrorAlert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { LoadingSpinner } from "@/components/extension/loading-spinner";

interface LoginFormProps {
  redirect?: Boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ redirect = true }) => {
  const {
    mutate: signInUser,
    isPending,
    isError,
    error,
  } = useSignInUser(redirect);

  return (
    <>
      {isError && <ErrorAlert name={error.name} message={error.message} />}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => signInUser(values)}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <NavLink
                    to="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </NavLink>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  required
                />
              </div>
              {isPending ? (
                <LoadingSpinner />
              ) : (
                <Button type="submit" className="w-full">
                  Login
                </Button>
              )}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
