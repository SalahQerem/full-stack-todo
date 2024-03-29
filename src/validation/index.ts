import * as yup from "yup";

export const registerSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is required!")
      .min(5, "Username must be at least 5 characters"),
    email: yup.string().required("Email is required!").email("Invalid email!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

  export const loginSchema = yup
  .object({
    identifier: yup
      .string()
      .required("Username is required!")
      .min(5, "Username must be at least 5 characters"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();