"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RecipeCard } from "@/modules/recipes/components/recipe-card"
import { getRecipes } from "@/modules/recipes/services/recipes-api"

const LIMIT = 9

export function RecipesPageContent() {
  const [text, setText] = useState("")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  // wait until user stops typing, then search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(text.trim())
      setPage(1)
    }, 400)

    return () => clearTimeout(timer)
  }, [text])

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recipes", search, page],
    queryFn: () => getRecipes(search, page, LIMIT),
  })

  const recipes = data?.recipes || []
  const total = data?.total || 0
  const totalPages = Math.ceil(total / LIMIT) || 1

  return (
    <div className="space-y-4">
      <div className="max-w-sm">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search recipes..."
        />
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          {(error as Error)?.message || "Something went wrong"}
        </p>
      )}

      {isLoading && (
        <p className="text-sm text-muted-foreground">Loading...</p>
      )}

      {!isLoading && recipes.length === 0 && (
        <p className="text-sm text-muted-foreground">No recipes found</p>
      )}

      {!isLoading && recipes.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
