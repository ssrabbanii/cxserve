import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./forms/LoginForm";
import { RegistrationForm } from "./forms/RegistrationForm";

export const LoginRegistrationCard = () => {
  return (
    <Tabs defaultValue="login" className="w-[400px] mx-auto my-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="registration">Registration</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <LoginForm redirect={false} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="registration">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <RegistrationForm redirect={false} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
