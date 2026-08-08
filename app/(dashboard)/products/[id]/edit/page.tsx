import { Suspense } from "react"
import type { Metadata } from "next"

import { EditProductPage } from "@/modules/products/components/edit-product-page"

export const metadata: Metadata = {
  title: "Edit Product",
}

export default function ProductEditRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          Loading form...
        </div>
      }
    >
      <EditProductPage />
    </Suspense>
  )
}
