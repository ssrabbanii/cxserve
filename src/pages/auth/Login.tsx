import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink } from "react-router-dom";
import { AuthPageWrapper } from "./AuthPageWrapper";
import { useSignInManager } from "@/services/auth";
import { Formik } from "formik";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { LoadingSpinner } from "@/components/extension/loading-spinner";

export const LoginPage = () => {
  const {
    mutate: signInManager,
    isPending,
    isError,
    error,
  } = useSignInManager();

  return (
    <AuthPageWrapper>
      <div className="mx-auto my-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => signInManager(values)}
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
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <NavLink to="/register" className="underline">
            Register
          </NavLink>
        </div>
      </div>
    </AuthPageWrapper>
  );
};
