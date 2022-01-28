import React from "react";
import { useFormik } from "formik";
import { IUser } from "../data/Users";
import { string, object } from "yup";

const AddUserContainter = () => {
  const message = "This is required";
  const { values, errors, touched, setFieldValue, handleSubmit } =
    useFormik<IUser>({
      initialValues: {
        id: "1",
        username: "",
        email: "",
        password: "password12345",
        firstName: "",
        lastName: "",
        isActive: false,
        isAdmin: false,
        createdOn: new Date(),
      },
      validationSchema: object().shape({
        username: string().required(message),
        email: string().required(message),
        firstName: string().required(message),
        lastName: string().required(message),
      }),
      onSubmit: (vals: IUser) => {
        //TODO: Implement create user
      },
    });
  return <div></div>;
};

export default AddUserContainter;
