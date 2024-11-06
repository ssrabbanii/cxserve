import { Outlet, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import { useAuthState } from "react-firebase-hooks/auth";
// import { LoadingSpinner } from "@/components/extension/loading-spinner";
import { auth } from "@/firebase";

const Root = () => {
  const navigate = useNavigate();
  const [manager, isLoading, isError] = useAuthState(auth);

  if (isLoading)
    return (
      <div className="min-h-screen w-full mx-auto my-auto bg-muted/40">
        {/* <LoadingSpinner /> */}
      </div>
    );

  if (isError || !manager) {
    navigate("/");
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="mx-auto w-[95vw] md:w-[90vw] lg:w-[80vw] flex flex-1 flex-col gap-8 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
