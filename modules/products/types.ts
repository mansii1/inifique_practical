export type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  brand?: string
  category: string
  stock: number
  rating: number
  thumbnail: string
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
