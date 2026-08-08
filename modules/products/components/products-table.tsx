"use client"

import Image from "next/image"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Eye,
  Pencil,
  Star,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type {
  Product,
  ProductSortKey,
  SortDirection,
} from "@/modules/products/types"

type ProductsTableProps = {
  products: Product[]
  sortKey: ProductSortKey
  sortDir: SortDirection
  onSort: (key: ProductSortKey) => void
}

const sortableColumns: {
  key: ProductSortKey
  label: string
  className?: string
}[] = [
  { key: "title", label: "Product" },
  { key: "price", label: "Price" },
  { key: "rating", label: "Rating", className: "hidden md:table-cell" },
  { key: "stock", label: "Stock", className: "hidden sm:table-cell" },
]

function SortIcon({
  active,
  direction,
}: {
  active: boolean
  direction: SortDirection
}) {
  if (!active) {
    return <ArrowUpDown className="size-3.5 text-muted-foreground/70" />
  }
  return direction === "asc" ? (
    <ArrowUp className="size-3.5 text-primary" />
  ) : (
    <ArrowDown className="size-3.5 text-primary" />
  )
}

export function ProductsTable({
  products,
  sortKey,
  sortDir,
  onSort,
}: ProductsTableProps) {
  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {sortableColumns.map((col) => {
              const isActive = sortKey === col.key
              return (
                <TableHead key={col.key} className={col.className}>
                  <button
                    type="button"
                    onClick={() => onSort(col.key)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-sm text-left font-medium uppercase tracking-wide transition-colors hover:text-foreground",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {col.label}
                    <SortIcon active={isActive} direction={sortDir} />
                  </button>
                </TableHead>
              )
            })}
            <TableHead className="hidden capitalize lg:table-cell">
              Category
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-secondary">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="40px"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="max-w-[160px] truncate font-medium sm:max-w-xs">
                      {product.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {product.brand || "Unknown brand"}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="leading-tight">
                  <p className="font-medium">${product.price.toFixed(2)}</p>
                  <p className="text-xs font-medium text-accent">
                    -{product.discountPercentage.toFixed(2)}%
                  </p>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  {product.rating.toFixed(2)}
                </span>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {product.stock < 15 ? (
                  <span className="inline-flex rounded-full border border-orange-300 bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700 dark:border-orange-700 dark:bg-orange-950 dark:text-orange-300">
                    Low · {product.stock} left
                  </span>
                ) : (
                  <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {product.stock} in stock
                  </span>
                )}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <span className="inline-flex rounded-full bg-secondary px-2 py-0.5 text-xs capitalize text-secondary-foreground">
                  {product.category}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`View ${product.title}`}
                    disabled
                  >
                    <Eye />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Edit ${product.title}`}
                    disabled
                  >
                    <Pencil />
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon-sm"
                    aria-label={`Delete ${product.title}`}
                    disabled
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
