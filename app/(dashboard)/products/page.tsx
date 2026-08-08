import { Suspense } from "react"
import type { Metadata } from "next"

import { ProductsPageContent } from "@/modules/products/components/products-page-content"

export const metadata: Metadata = {
  title: "Products",
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          Loading products...
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  )
}
