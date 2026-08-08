import Image from "next/image"
import Link from "next/link"

import type { Recipe } from "@/modules/recipes/types"

export function RecipeDetailsView({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes

  return (
    <div className="space-y-5">
      <div>
        <Link href="/recipes" className="text-sm text-primary hover:underline">
          ← Back to recipes
        </Link>
        <h1 className="mt-2 text-xl font-semibold">{recipe.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {recipe.cuisine} · {recipe.difficulty}
        </p>
      </div>

      <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-lg border bg-secondary">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="space-y-1 text-sm">
        <p>Prep: {recipe.prepTimeMinutes} min</p>
        <p>Cook: {recipe.cookTimeMinutes} min</p>
        <p>Total: {totalTime} min</p>
        <p>Servings: {recipe.servings}</p>
        <p>Calories: {recipe.caloriesPerServing}</p>
        <p>
          Rating: {recipe.rating} ({recipe.reviewCount} reviews)
        </p>
        {recipe.mealType?.length > 0 && (
          <p>Meal type: {recipe.mealType.join(", ")}</p>
        )}
      </div>

      {recipe.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {recipe.tags.map((tag) => (
            <span key={tag} className="rounded bg-secondary px-2 py-0.5 text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div>
        <h2 className="mb-2 font-semibold">Ingredients</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-2 font-semibold">Instructions</h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}
