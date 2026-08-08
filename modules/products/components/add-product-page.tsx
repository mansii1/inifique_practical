"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { getErrorMessage } from "@/lib/api/get-error-message"
import { ProductForm } from "@/modules/products/components/product-form"
import type { ProductFormValues } from "@/modules/products/schemas/product-schema"
import { createProduct } from "@/modules/products/services/products-api"
import {
  getListQueryString,
  productsListHref,
} from "@/modules/products/utils/list-query"

export function AddProductPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const listHref = productsListHref(getListQueryString(searchParams))
  const [successMsg, setSuccessMsg] = useState("")

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: async (created) => {
      setSuccessMsg(`Added "${created.title}"`)
      await queryClient.invalidateQueries({ queryKey: ["products"] })
      setTimeout(() => router.push(listHref), 700)
    },
  })

  async function handleSubmit(values: ProductFormValues) {
    setSuccessMsg("")
    await mutation.mutateAsync(values)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Add Product</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill the form and save.
        </p>
      </div>

      <div className="rounded-lg border border-border p-4 md:p-6">
        <ProductForm
          submitLabel="Add Product"
          cancelHref={listHref}
          onSubmit={handleSubmit}
          successMessage={successMsg}
          errorMessage={
            mutation.isError
              ? getErrorMessage(mutation.error, "Could not add product")
              : undefined
          }
        />
      </div>
    </div>
  )
}
