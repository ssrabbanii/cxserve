import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import { Home } from "./pages/home/Home";
import { Rooms } from "./pages/rooms/Rooms";
import { RoomPage } from "./pages/rooms/Room";
import { Bookings } from "./pages/bookings/Bookings";
import { BookingPage } from "./pages/bookings/Booking";
import { ThemeProvider } from "./components/theme-provider";

import { RegistrationPage } from "./pages/auth/Registration";
import { LoginPage } from "./pages/auth/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HotelPage } from "./pages/hotels/Hotel";
import { Hotels } from "./pages/hotels/Hotels";
import { Flights } from "./pages/flights/Flights";

// User not logged in

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
        path: "/hotels",
        element: <Hotels />,
      },
      {
        path: "/hotels/:hotelId",
        element: <HotelPage />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/rooms/:roomId",
        element: <RoomPage />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/bookings/:bookingId",
        element: <BookingPage />,
      },
      {
        path: "/flights",
        element: <Flights />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
