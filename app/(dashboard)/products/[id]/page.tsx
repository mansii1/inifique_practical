import { Suspense } from "react"
import type { Metadata } from "next"

import { ProductDetails } from "@/modules/products/components/product-details"

export const metadata: Metadata = {
  title: "Product Details",
}

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          Loading product...
        </div>
      }
    >
      <ProductDetails />
    </Suspense>
  )
}
