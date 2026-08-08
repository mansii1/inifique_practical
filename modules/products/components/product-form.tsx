"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Button, buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  productSchema,
  type ProductFormValues,
} from "@/modules/products/schemas/product-schema"

const defaults: ProductFormValues = {
  title: "",
  description: "",
  price: 0,
  discountPercentage: 0,
  brand: "",
  category: "",
  stock: 0,
}

const inputClass =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive dark:bg-input/30"

type Props = {
  defaultValues?: Partial<ProductFormValues>
  submitLabel?: string
  cancelHref: string
  onSubmit: (values: ProductFormValues) => Promise<void>
  errorMessage?: string
  successMessage?: string
}

export function ProductForm({
  defaultValues,
  submitLabel = "Save",
  cancelHref,
  onSubmit,
  errorMessage,
  successMessage,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: yupResolver(productSchema),
    defaultValues: { ...defaults, ...defaultValues },
  })

  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={handleSubmit((values) => onSubmit(values))}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1 md:col-span-2">
          <Label htmlFor="title">Title</Label>
          <input
            id="title"
            className={inputClass}
            aria-invalid={!!errors.title}
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-1 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            rows={3}
            className={cn(inputClass, "h-auto py-2")}
            aria-invalid={!!errors.description}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="price">Price</Label>
          <input
            id="price"
            type="number"
            step="0.01"
            min={0}
            className={inputClass}
            aria-invalid={!!errors.price}
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-xs text-destructive">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="discountPercentage">Discount (%)</Label>
          <input
            id="discountPercentage"
            type="number"
            step="0.01"
            min={0}
            max={100}
            className={inputClass}
            aria-invalid={!!errors.discountPercentage}
            {...register("discountPercentage", { valueAsNumber: true })}
          />
          {errors.discountPercentage && (
            <p className="text-xs text-destructive">
              {errors.discountPercentage.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="stock">Stock</Label>
          <input
            id="stock"
            type="number"
            min={0}
            className={inputClass}
            aria-invalid={!!errors.stock}
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && (
            <p className="text-xs text-destructive">{errors.stock.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="brand">Brand</Label>
          <input
            id="brand"
            className={inputClass}
            aria-invalid={!!errors.brand}
            {...register("brand")}
          />
          {errors.brand && (
            <p className="text-xs text-destructive">{errors.brand.message}</p>
          )}
        </div>

        <div className="space-y-1 md:col-span-2">
          <Label htmlFor="category">Category</Label>
          <input
            id="category"
            className={inputClass}
            aria-invalid={!!errors.category}
            {...register("category")}
          />
          {errors.category && (
            <p className="text-xs text-destructive">{errors.category.message}</p>
          )}
        </div>
      </div>

      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-sm text-accent">{successMessage}</p>
      )}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Link
          href={cancelHref}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "justify-center"
          )}
        >
          Cancel
        </Link>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : submitLabel}
        </Button>
      </div>
    </form>
  )
}
