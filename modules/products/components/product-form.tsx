"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  productSchema,
  type ProductFormValues,
} from "@/modules/products/schemas/product-schema"

const defaultValues: ProductFormValues = {
  title: "",
  description: "",
  price: 0,
  discountPercentage: 0,
  brand: "",
  category: "",
  stock: 0,
}

type ProductFormProps = {
  submitLabel?: string
}

export function ProductForm({ submitLabel = "Save Product" }: ProductFormProps) {
  const [successMessage, setSuccessMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormValues>({
    resolver: yupResolver(productSchema),
    defaultValues,
  })

  function onSubmit(values: ProductFormValues) {
    // API wiring comes later — validation only for now
    console.log("Validated product:", values)
    setSuccessMessage("Looks good — API will be connected later.")
    reset(defaultValues)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="e.g. Wireless Headphones"
            aria-invalid={!!errors.title}
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            rows={3}
            placeholder="Short product description"
            aria-invalid={!!errors.description}
            className="w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min={0}
            aria-invalid={!!errors.price}
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-xs text-destructive">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="discountPercentage">Discount (%)</Label>
          <Input
            id="discountPercentage"
            type="number"
            step="0.01"
            min={0}
            max={100}
            aria-invalid={!!errors.discountPercentage}
            {...register("discountPercentage", { valueAsNumber: true })}
          />
          {errors.discountPercentage && (
            <p className="text-xs text-destructive">
              {errors.discountPercentage.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            step={1}
            min={0}
            aria-invalid={!!errors.stock}
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && (
            <p className="text-xs text-destructive">{errors.stock.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            placeholder="e.g. Apple"
            aria-invalid={!!errors.brand}
            {...register("brand")}
          />
          {errors.brand && (
            <p className="text-xs text-destructive">{errors.brand.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="e.g. smartphones"
            aria-invalid={!!errors.category}
            {...register("category")}
          />
          {errors.category && (
            <p className="text-xs text-destructive">{errors.category.message}</p>
          )}
        </div>
      </div>

      {successMessage && (
        <p className="rounded-md bg-accent/10 px-3 py-2 text-sm text-accent">
          {successMessage}
        </p>
      )}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          render={<Link href="/products" />}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
