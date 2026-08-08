"use client"

import Link from "next/link"
import { Plus, Search } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { withListQuery } from "@/modules/products/utils/list-query"

type ProductsToolbarProps = {
  search: string
  listQuery: string
  onSearchChange: (value: string) => void
}

export function ProductsToolbar({
  search,
  listQuery,
  onSearchChange,
}: ProductsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="pl-8"
          aria-label="Search products"
        />
      </div>

      <Link
        href={withListQuery("/products/new", listQuery)}
        className={cn(
          buttonVariants(),
          "w-full justify-center sm:w-auto"
        )}
      >
        <Plus className="size-4" />
        Add Product
      </Link>
    </div>
  )
}
