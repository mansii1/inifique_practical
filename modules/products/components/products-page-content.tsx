"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { ProductsPagination } from "@/modules/products/components/products-pagination"
import { ProductsTable } from "@/modules/products/components/products-table"
import { ProductsToolbar } from "@/modules/products/components/products-toolbar"
import { getProducts } from "@/modules/products/services/products-api"
import type { ProductSortKey, SortDirection } from "@/modules/products/types"

const PAGE_SIZE = 10
const SORT_KEYS: ProductSortKey[] = ["title", "price", "stock", "rating"]

function parseSortKey(value: string | null): ProductSortKey {
  if (value && SORT_KEYS.includes(value as ProductSortKey)) {
    return value as ProductSortKey
  }
  return "title"
}

function parseSortDir(value: string | null): SortDirection {
  return value === "desc" ? "desc" : "asc"
}

export function ProductsPageContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const q = searchParams.get("q") ?? ""
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1)
  const sortKey = parseSortKey(searchParams.get("sortBy"))
  const sortDir = parseSortDir(searchParams.get("order"))

  const [searchInput, setSearchInput] = useState(q)

  useEffect(() => {
    setSearchInput(q)
  }, [q])

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname)
  }

  // Debounce search into the URL (server-side via API)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput === q) return
      updateParams({
        q: searchInput.trim() || null,
        page: "1",
      })
    }, 400)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run on typed search
  }, [searchInput])

  function handleSort(key: ProductSortKey) {
    if (sortKey === key) {
      updateParams({
        sortBy: key,
        order: sortDir === "asc" ? "desc" : "asc",
        page: "1",
      })
      return
    }

    updateParams({
      sortBy: key,
      order: "asc",
      page: "1",
    })
  }

  const skip = (page - 1) * PAGE_SIZE

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["products", { q, page, sortKey, sortDir, limit: PAGE_SIZE }],
    queryFn: () =>
      getProducts({
        q,
        limit: PAGE_SIZE,
        skip,
        sortBy: sortKey,
        order: sortDir,
      }),
    placeholderData: (prev) => prev,
  })

  const total = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const products = data?.products ?? []

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">
          Search, sort and page through the catalogue — handled by the API.
        </p>
      </div>

      <ProductsToolbar search={searchInput} onSearchChange={setSearchInput} />

      {isError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {(error as Error)?.message || "Failed to load products."}
        </div>
      )}

      {isLoading ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-border text-sm text-muted-foreground">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-border text-sm text-muted-foreground">
          No products found.
        </div>
      ) : (
        <div className={isFetching ? "opacity-70 transition-opacity" : ""}>
          <ProductsTable
            products={products}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={handleSort}
          />
        </div>
      )}

      <ProductsPagination
        page={Math.min(page, totalPages)}
        totalPages={totalPages}
        onPageChange={(nextPage) =>
          updateParams({ page: nextPage <= 1 ? null : String(nextPage) })
        }
      />
    </div>
  )
}
