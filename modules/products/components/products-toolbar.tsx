"use client"

import Link from "next/link"
import { Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type ProductsToolbarProps = {
  search: string
  onSearchChange: (value: string) => void
}

export function ProductsToolbar({
  search,
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

      <Button render={<Link href="/products/new" />} className="w-full sm:w-auto">
        <Plus className="size-4" />
        Add Product
      </Button>
    </div>
  )
}
