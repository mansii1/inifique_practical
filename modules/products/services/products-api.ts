import { api } from "@/lib/api/axios"
import type {
  ProductsListParams,
  ProductsListResponse,
} from "@/modules/products/types"

export async function getProducts(
  params: ProductsListParams
): Promise<ProductsListResponse> {
  const { q, limit, skip, sortBy, order } = params
  const query = q?.trim()

  const searchParams = {
    limit,
    skip,
    sortBy,
    order,
    ...(query ? { q: query } : {}),
  }

  const url = query ? "/products/search" : "/products"
  const { data } = await api.get<ProductsListResponse>(url, {
    params: searchParams,
  })

  return data
}
