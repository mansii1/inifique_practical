"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { getErrorMessage } from "@/lib/api/get-error-message"
import { ProductsPagination } from "@/modules/products/components/products-pagination"
import { ProductsTable } from "@/modules/products/components/products-table"
import { ProductsToolbar } from "@/modules/products/components/products-toolbar"
import {
  deleteProduct,
  getProducts,
} from "@/modules/products/services/products-api"
import type {
  Product,
  ProductSortKey,
  ProductsListResponse,
  SortDirection,
} from "@/modules/products/types"
import { getListQueryString } from "@/modules/products/utils/list-query"

const PAGE_SIZE = 10

function getSortKey(value: string | null): ProductSortKey {
  if (value === "price" || value === "stock" || value === "rating") return value
  return "title"
}

export function ProductsPageContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const q = searchParams.get("q") ?? ""
  const page = Math.max(1, Number(searchParams.get("page") || 1))
  const sortKey = getSortKey(searchParams.get("sortBy"))
  const sortDir: SortDirection =
    searchParams.get("order") === "desc" ? "desc" : "asc"
  const listQuery = getListQueryString(searchParams)

  const [search, setSearch] = useState(q)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    setSearch(q)
  }, [q])

  function setParams(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString())

    Object.keys(next).forEach((key) => {
      const value = next[key]
      if (!value) params.delete(key)
      else params.set(key, value)
    })

    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname)
  }

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      if (search === q) return
      setParams({ q: search.trim() || null, page: "1" })
    }, 400)

    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  function onSort(key: ProductSortKey) {
    if (key === sortKey) {
      setParams({
        sortBy: key,
        order: sortDir === "asc" ? "desc" : "asc",
        page: "1",
      })
    } else {
      setParams({ sortBy: key, order: "asc", page: "1" })
    }
  }

  const skip = (page - 1) * PAGE_SIZE

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["products", q, page, sortKey, sortDir],
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

  const deleteMutation = useMutation({
    mutationFn: (product: Product) => deleteProduct(product.id),
    onSuccess: (_res, product) => {
      // api doesn't really delete, so just drop it from cache for now
      queryClient.setQueriesData<ProductsListResponse>(
        { queryKey: ["products"] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            products: old.products.filter((p) => p.id !== product.id),
            total: Math.max(0, old.total - 1),
          }
        }
      )
      setMsg(`Deleted "${product.title}"`)
      setDeleteTarget(null)
      if (data && data.products.length <= 1 && page > 1) {
        setParams({ page: String(page - 1) })
      }
    },
  })

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / PAGE_SIZE))
  const products = data?.products ?? []

  return (
    <div className="space-y-4">
      <ProductsToolbar
        search={search}
        listQuery={listQuery}
        onSearchChange={setSearch}
      />

      {msg && <p className="text-sm text-accent">{msg}</p>}

      {isError && (
        <p className="text-sm text-destructive">
          {getErrorMessage(error, "Failed to load products")}
        </p>
      )}

      {deleteMutation.isError && (
        <p className="text-sm text-destructive">
          {getErrorMessage(deleteMutation.error, "Delete failed")}
        </p>
      )}

      {isLoading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          Loading...
        </p>
      ) : products.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No products found
        </p>
      ) : (
        <div className={isFetching ? "opacity-70" : undefined}>
          <ProductsTable
            products={products}
            sortKey={sortKey}
            sortDir={sortDir}
            listQuery={listQuery}
            onSort={onSort}
            onDelete={setDeleteTarget}
            deletingId={deleteMutation.isPending ? deleteTarget?.id : null}
          />
        </div>
      )}

      <ProductsPagination
        page={Math.min(page, totalPages)}
        totalPages={totalPages}
        onPageChange={(p) => setParams({ page: p <= 1 ? null : String(p) })}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this product?"
        description={
          deleteTarget ? `Remove "${deleteTarget.title}"?` : undefined
        }
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
        onCancel={() => {
          if (!deleteMutation.isPending) setDeleteTarget(null)
        }}
        onConfirm={() => {
          if (!deleteTarget) return
          setMsg("")
          deleteMutation.mutate(deleteTarget)
        }}
      />
    </div>
  )
}
