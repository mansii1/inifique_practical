import Link from "next/link"
import type { Metadata } from "next"

import { RecipeDetailsView } from "@/modules/recipes/components/recipe-details-view"
import { getRecipeById } from "@/modules/recipes/services/recipes-api"

type Props = {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: "Recipe Details",
}

export default async function RecipeDetailsPage({ params }: Props) {
  const { id } = await params
  const recipeId = Number(id)

  if (!recipeId) {
    return (
      <div>
        <p className="text-sm text-destructive">Invalid id</p>
        <Link href="/recipes" className="text-sm text-primary underline">
          Go back
        </Link>
      </div>
    )
  }

  try {
    const recipe = await getRecipeById(recipeId)
    return <RecipeDetailsView recipe={recipe} />
  } catch {
    return (
      <div>
        <p className="text-sm text-destructive">Recipe not found</p>
        <Link href="/recipes" className="text-sm text-primary underline">
          Go back
        </Link>
      </div>
    )
  }
}
