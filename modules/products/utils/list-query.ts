// helpers to keep list filters in the url when we move around

const keys = ["q", "sortBy", "order", "page"]

export function getListQueryString(searchParams: URLSearchParams) {
  const params = new URLSearchParams()

  keys.forEach((key) => {
    const value = searchParams.get(key)
    if (value) params.set(key, value)
  })

  return params.toString()
}

export function productsListHref(listQuery: string) {
  return listQuery ? `/products?${listQuery}` : "/products"
}

export function withListQuery(path: string, listQuery: string) {
  return listQuery ? `${path}?${listQuery}` : path
}
