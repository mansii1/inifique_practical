import * as yup from "yup"

export const userSchema = yup.object({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup.string().trim().required("Phone is required"),
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(3, "At least 3 characters"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(1, "Age looks invalid")
    .max(120, "Age looks invalid")
    .integer("Age must be a whole number"),
  gender: yup.string().trim().required("Gender is required"),
})

export type UserFormValues = yup.InferType<typeof userSchema>
