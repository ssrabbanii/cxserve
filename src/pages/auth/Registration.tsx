import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import { LoadingSpinner } from "@/components/extension/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useRegisterManager } from "@/services/auth";
import { AuthPageWrapper } from "./AuthPageWrapper";
import { emptyUser } from "@/utils/data/manager";

// Add form validations

export const RegistrationPage = () => {
  const {
    mutate: registerManager,
    isPending,
    isError,
    error,
  } = useRegisterManager();

  return (
    <AuthPageWrapper>
      <div className="mx-auto my-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Register</h1>
        </div>
        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
        <Formik
          initialValues={{ ...emptyUser, password: "", comfirmPassword: "" }}
          onSubmit={(values) => registerManager(values)}
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
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <NavLink to="/login" className="underline">
            Log in
          </NavLink>
        </div>
      </div>
    </AuthPageWrapper>
  );
};
