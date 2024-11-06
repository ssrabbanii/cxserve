import { FormikErrors } from "formik";

export interface FormikFormComponentProps<T> {
    values: T;
    onChange: {
      (e: React.ChangeEvent<any>): void;
      <T_1 = string | React.ChangeEvent<any>>(
        field: T_1
      ): T_1 extends React.ChangeEvent<any>
        ? void
        : (e: string | React.ChangeEvent<any>) => void;
    };
    onBlur: {
      (e: React.FocusEvent<any, Element>): void;
      <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    };
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<T>>;
    editable: boolean;
}