import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recipes",
}

export default function RecipesPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">Recipes</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Recipe cards will show up here.
      </p>
    </div>
  )
}
