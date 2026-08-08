import { api } from "@/lib/api/axios"
import type {
  Product,
  ProductPayload,
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

export async function getProduct(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`)
  return data
}

export async function createProduct(payload: ProductPayload): Promise<Product> {
  const { data } = await api.post<Product>("/products/add", payload)
  return data
}

export async function updateProduct(
  id: number,
  payload: ProductPayload
): Promise<Product> {
  const { data } = await api.put<Product>(`/products/${id}`, payload)
  return data
}

export async function deleteProduct(id: number): Promise<Product> {
  const { data } = await api.delete<Product>(`/products/${id}`)
  return data
}
