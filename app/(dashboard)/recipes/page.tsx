import type { Metadata } from "next"

import { RecipesPageContent } from "@/modules/recipes/components/recipes-page-content"

export const metadata: Metadata = {
  title: "Recipes",
}

export default function RecipesPage() {
  return <RecipesPageContent />
}
