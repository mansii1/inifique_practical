export type ProductReview = {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export type ProductDimensions = {
  width: number
  height: number
  depth: number
}

export type ProductMeta = {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags?: string[]
  brand?: string
  sku?: string
  weight?: number
  dimensions?: ProductDimensions
  warrantyInformation?: string
  shippingInformation?: string
  availabilityStatus?: string
  reviews?: ProductReview[]
  returnPolicy?: string
  minimumOrderQuantity?: number
  meta?: ProductMeta
  images?: string[]
  thumbnail: string
  isDeleted?: boolean
  deletedOn?: string
}

export type ProductPayload = {
  title: string
  description: string
  price: number
  discountPercentage: number
  brand: string
  category: string
  stock: number
}

export type ProductSortKey = "title" | "price" | "stock" | "rating"

export type SortDirection = "asc" | "desc"

export type ProductsListParams = {
  q?: string
  limit: number
  skip: number
  sortBy: ProductSortKey
  order: SortDirection
}

export type ProductsListResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}
