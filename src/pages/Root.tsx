import { Outlet } from "react-router-dom";
import { Header } from "@/components/header/Header";
// import { LoadingSpinner } from "@/components/extension/loading-spinner";

export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
