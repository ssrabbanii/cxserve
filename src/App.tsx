import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as AtomProvider } from "jotai";
import { Root } from "./pages/Root";
import "./App.css";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegistrationPage } from "./pages/auth/RegistrationPage";
import { Home } from "./pages/home/Home";
import { HotelPage } from "./pages/hotel/HotelPage";
import { BookingPage } from "./pages/booking/BookingPage";
import { ReservePage } from "./pages/reserve/ReservePage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/hotels/:hotelId",
        element: <HotelPage />,
      },
      {
        path: "/reserve/:roomId",
        element: <ReservePage />,
      },
      {
        path: "/bookings/:bookingId",
        element: <BookingPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <AtomProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AtomProvider>
  );
}

export default App;
