"use client"

import Image from "next/image"
import Link from "next/link"

import type { Recipe } from "@/modules/recipes/types"

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block rounded-lg border p-2">
      <div className="relative mb-2 h-40 w-full overflow-hidden rounded-md bg-secondary">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <h3 className="text-sm font-semibold">{recipe.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {recipe.cuisine} · {recipe.difficulty}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Rating: {recipe.rating} · {recipe.servings} servings
      </p>
    </Link>
  )
}
