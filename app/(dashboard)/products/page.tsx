import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products",
}

export default function ProductsPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">Products</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Product list will show up here.
      </p>
    </div>
  )
}
