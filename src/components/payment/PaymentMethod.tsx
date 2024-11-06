import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BadgeCheck, Banknote, CreditCard } from "lucide-react";
import React, { useState } from "react";

enum PaymentMethodEnum {
  CARD = "card",
  CASH = "cash",
}

const CardPaymentForm = () => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="First Last" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="number">Card number</Label>
        <Input id="number" placeholder="" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="month">Expires</Label>
          <Select>
            <SelectTrigger id="month">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">January</SelectItem>
              <SelectItem value="2">February</SelectItem>
              <SelectItem value="3">March</SelectItem>
              <SelectItem value="4">April</SelectItem>
              <SelectItem value="5">May</SelectItem>
              <SelectItem value="6">June</SelectItem>
              <SelectItem value="7">July</SelectItem>
              <SelectItem value="8">August</SelectItem>
              <SelectItem value="9">September</SelectItem>
              <SelectItem value="10">October</SelectItem>
              <SelectItem value="11">November</SelectItem>
              <SelectItem value="12">December</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="year">Year</Label>
          <Select>
            <SelectTrigger id="year">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => (
                <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                  {new Date().getFullYear() + i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input id="cvc" placeholder="CVC" />
        </div>
      </div>
    </>
  );
};

interface PaymentMethodProps {
  paymentConfirmed: boolean;
  setPaymentConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentConfirmed,
  setPaymentConfirmed,
}) => {
  const [method, setMethod] = useState<PaymentMethodEnum>(
    PaymentMethodEnum.CASH
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row gap-2">
          Payment
          {paymentConfirmed && <BadgeCheck color="green" />}
        </CardTitle>
        <CardDescription>Choose your payment method</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
        <RadioGroup
          disabled={paymentConfirmed}
          defaultValue={method}
          onValueChange={(value) => setMethod(value as PaymentMethodEnum)}
          className="grid grid-cols-3 gap-4"
        >
          <div>
            <RadioGroupItem
              value={PaymentMethodEnum.CARD}
              id={PaymentMethodEnum.CARD}
              className="peer sr-only"
            />
            <Label
              htmlFor={PaymentMethodEnum.CARD}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <CreditCard className="mb-3 h-6 w-6" />
              Card
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value={PaymentMethodEnum.CASH}
              id={PaymentMethodEnum.CASH}
              className="peer sr-only"
            />
            <Label
              htmlFor={PaymentMethodEnum.CASH}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Banknote className="mb-3 h-6 w-6" />
              Cash
            </Label>
          </div>
        </RadioGroup>
        {method === PaymentMethodEnum.CARD && <CardPaymentForm />}
        {method === PaymentMethodEnum.CASH && <></>}
      </CardContent>
      <CardFooter>
        {paymentConfirmed ? (
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => setPaymentConfirmed(false)}
          >
            Edit
          </Button>
        ) : (
          <Button className="w-full" onClick={() => setPaymentConfirmed(true)}>
            Continue
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
