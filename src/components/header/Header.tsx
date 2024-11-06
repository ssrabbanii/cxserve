import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { LoadingSpinner } from "@/components/extension/loading-spinner";
import { useSignOutUser } from "@/services/auth";
import { GlobalDatePicker } from "../date/GlobalDatePicker";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [];

export const Header = () => {
  const navigate = useNavigate();
  const [user, isLoading, isError] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    mutate: signOutUser,
    isPending: isSignOutPending,
    // isError,
    // error,
  } = useSignOutUser();

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-20 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="font-bold text-xl flex"
            >
              TimePass
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    TimePass BD
                  </SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <div className="hidden md:flex gap-2">
            <GlobalDatePicker />
          </div>

          <div className="hidden md:flex gap-2">
            {isLoading || isSignOutPending ? (
              <LoadingSpinner />
            ) : user ? (
              <Button
                onClick={() => signOutUser()}
                variant="secondary"
                className="border"
              >
                Log Out
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                variant="secondary"
                className="border"
              >
                Sign In
              </Button>
            )}
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
