import { NavLink } from "react-router-dom";
import { AuthPageWrapper } from "./AuthPageWrapper";
import { LoginForm } from "./forms/LoginForm";

export const LoginPage = () => {
  return (
    <AuthPageWrapper>
      <div className="mx-auto my-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <LoginForm />
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
