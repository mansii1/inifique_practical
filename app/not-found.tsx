import type { Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
}

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="text-sm text-muted-foreground">
        This page does not exist.
      </p>
      <Link href="/products" className={buttonVariants()}>
        Back to products
      </Link>
    </div>
  )
}
