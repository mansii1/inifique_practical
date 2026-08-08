"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, Pencil, Star } from "lucide-react"

import { getErrorMessage } from "@/lib/api/get-error-message"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getProduct } from "@/modules/products/services/products-api"
import {
  getListQueryString,
  productsListHref,
  withListQuery,
} from "@/modules/products/utils/list-query"

export function ProductDetails() {
  const { id: idParam } = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const listQuery = getListQueryString(searchParams)
  const listHref = productsListHref(listQuery)
  const id = Number(idParam)

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  })

  if (!id) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-destructive">Invalid id</p>
        <Link href={listHref} className={cn(buttonVariants({ variant: "outline" }))}>
          Back
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>
  }

  if (isError || !product) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-destructive">
          {getErrorMessage(error, "Product not found")}
        </p>
        <Link href={listHref} className={cn(buttonVariants({ variant: "outline" }))}>
          Back
        </Link>
      </div>
    )
  }

  const images = product.images?.length ? product.images : [product.thumbnail]
  const dims = product.dimensions
    ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`
    : "-"

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href={listHref}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-2 -ml-2")}
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.brand || "No brand"} / {product.category}
            {product.sku ? ` / ${product.sku}` : ""}
          </p>
        </div>

        <Link
          href={withListQuery(`/products/${product.id}/edit`, listQuery)}
          className={cn(buttonVariants(), "justify-center")}
        >
          <Pencil className="size-4" />
          Edit
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="space-y-2">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-secondary">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover"
              sizes="260px"
              unoptimized
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-2">
              {images.map((src) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-md border bg-secondary"
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" unoptimized />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{product.description}</p>

          {!!product.tags?.length && (
            <div className="flex flex-wrap gap-1">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-secondary px-2 py-0.5 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="mt-1 font-medium">${product.price.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Discount</p>
              <p className="mt-1 font-medium text-accent">
                -{product.discountPercentage.toFixed(2)}%
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Stock</p>
              <p className="mt-1 font-medium">{product.stock}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Rating</p>
              <p className="mt-1 flex items-center gap-1 font-medium">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                {product.rating.toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Availability</p>
              <p className="mt-1 font-medium">{product.availabilityStatus || "-"}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Weight</p>
              <p className="mt-1 font-medium">{product.weight ?? "-"}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Dimensions</p>
              <p className="mt-1 font-medium">{dims}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Min order</p>
              <p className="mt-1 font-medium">{product.minimumOrderQuantity ?? "-"}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Warranty</p>
              <p className="mt-1 font-medium">{product.warrantyInformation || "-"}</p>
            </div>
            <div className="rounded-lg border p-3 sm:col-span-2">
              <p className="text-xs text-muted-foreground">Shipping</p>
              <p className="mt-1 font-medium">{product.shippingInformation || "-"}</p>
            </div>
            <div className="rounded-lg border p-3 sm:col-span-2">
              <p className="text-xs text-muted-foreground">Return policy</p>
              <p className="mt-1 font-medium">{product.returnPolicy || "-"}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Barcode</p>
              <p className="mt-1 font-medium">{product.meta?.barcode || "-"}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="mt-1 font-medium">
                {product.meta?.createdAt
                  ? new Date(product.meta.createdAt).toLocaleString()
                  : "-"}
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Updated</p>
              <p className="mt-1 font-medium">
                {product.meta?.updatedAt
                  ? new Date(product.meta.updatedAt).toLocaleString()
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {!!product.reviews?.length && (
        <div className="space-y-3">
          <h3 className="font-semibold">Reviews</h3>
          {product.reviews.map((review, i) => (
            <div key={i} className="rounded-lg border p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">{review.reviewerName}</p>
                <span className="flex items-center gap-1 text-sm">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  {review.rating}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {review.reviewerEmail} · {new Date(review.date).toLocaleDateString()}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
