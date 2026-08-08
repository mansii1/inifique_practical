import type { Metadata } from "next"

import { ProductForm } from "@/modules/products/components/product-form"

export const metadata: Metadata = {
  title: "Add Product",
}

export default function AddProductPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Add Product</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the details below. Validation runs on submit; API comes later.
        </p>
      </div>

      <div className="rounded-lg border border-border p-4 md:p-6">
        <ProductForm submitLabel="Add Product" />
      </div>
    </div>
  )
}
