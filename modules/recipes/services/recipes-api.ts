import { api } from "@/lib/api/axios"
import type { Recipe, RecipesListResponse } from "@/modules/recipes/types"

export async function getRecipes(search: string, page: number, limit = 9) {
  const skip = (page - 1) * limit
  const q = search.trim()
  const url = q ? "/recipes/search" : "/recipes"

  const { data } = await api.get<RecipesListResponse>(url, {
    params: {
      limit,
      skip,
      q: q || undefined,
    },
  })

  return data
}

export async function getRecipeById(id: number) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dummyjson.com"
  const res = await fetch(`${base}/recipes/${id}`, { cache: "no-store" })

  if (!res.ok) {
    throw new Error("Recipe not found")
  }

  return (await res.json()) as Recipe
}
