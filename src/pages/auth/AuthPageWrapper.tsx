import { LoadingSpinner } from "@/components/extension/loading-spinner";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";

interface AuthPageWrapperProps {
  children: ReactNode;
}

export const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [manager, isLoading, isError] = useAuthState(auth);

  if (isLoading)
    return (
      <div className="w-full lg:grid h-[100vh] lg:grid-cols-2">
        <LoadingSpinner />
      </div>
    );
    
  if (manager) {
    navigate("/");
  }

  return (
    <div className="w-full lg:grid h-[100vh] lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">{children}</div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/src/assets/navy-bg.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
