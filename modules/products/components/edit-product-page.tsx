"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { getErrorMessage } from "@/lib/api/get-error-message"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ProductForm } from "@/modules/products/components/product-form"
import type { ProductFormValues } from "@/modules/products/schemas/product-schema"
import {
  getProduct,
  updateProduct,
} from "@/modules/products/services/products-api"
import type { Product, ProductsListResponse } from "@/modules/products/types"
import {
  getListQueryString,
  productsListHref,
} from "@/modules/products/utils/list-query"

export function EditProductPage() {
  const { id: idParam } = useParams<{ id: string }>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const listHref = productsListHref(getListQueryString(searchParams))
  const id = Number(idParam)
  const [successMsg, setSuccessMsg] = useState("")

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  })

  const mutation = useMutation({
    mutationFn: (values: ProductFormValues) => updateProduct(id, values),
    onSuccess: (updated, values) => {
      // DummyJSON doesn't persist, so patch local cache for this session
      const next: Product = {
        ...(product as Product),
        ...updated,
        ...values,
        id,
      }

      queryClient.setQueryData(["product", id], next)
      queryClient.setQueriesData<ProductsListResponse>(
        { queryKey: ["products"] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            products: old.products.map((p) => (p.id === id ? { ...p, ...next } : p)),
          }
        }
      )

      setSuccessMsg("Saved")
      setTimeout(() => router.push(listHref), 700)
    },
  })

  if (!id) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-destructive">Invalid product id</p>
        <Link href={listHref} className={cn(buttonVariants({ variant: "outline" }))}>
          Back
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>
  }

  if (isError || !product) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-destructive">
          {getErrorMessage(error, "Product not found")}
        </p>
        <Link href={listHref} className={cn(buttonVariants({ variant: "outline" }))}>
          Back
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Edit Product</h2>
        <p className="mt-1 text-sm text-muted-foreground">{product.title}</p>
      </div>

      <div className="rounded-lg border border-border p-4 md:p-6">
        <ProductForm
          key={product.id}
          submitLabel="Update"
          cancelHref={listHref}
          defaultValues={{
            title: product.title,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage,
            brand: product.brand ?? "",
            category: product.category,
            stock: product.stock,
          }}
          onSubmit={async (values) => {
            setSuccessMsg("")
            await mutation.mutateAsync(values)
          }}
          successMessage={successMsg}
          errorMessage={
            mutation.isError
              ? getErrorMessage(mutation.error, "Could not update product")
              : undefined
          }
        />
      </div>
    </div>
  )
}
