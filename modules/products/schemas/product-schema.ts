import * as yup from "yup"

export const productSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  discountPercentage: yup
    .number()
    .typeError("Discount must be a number")
    .required("Discount is required")
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%"),
  brand: yup.string().trim().required("Brand is required"),
  category: yup.string().trim().required("Category is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .required("Stock is required")
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),
})

export type ProductFormValues = yup.InferType<typeof productSchema>
