import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Users",
}

export default function UsersPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">Users</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        User management will show up here.
      </p>
    </div>
  )
}
