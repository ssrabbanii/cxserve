import { NavLink } from "react-router-dom";
import { AuthPageWrapper } from "./AuthPageWrapper";
import { RegistrationForm } from "./forms/RegistrationForm";

export const RegistrationPage = () => {
  return (
    <AuthPageWrapper>
      <div className="mx-auto my-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Register</h1>
        </div>
        <RegistrationForm />
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
