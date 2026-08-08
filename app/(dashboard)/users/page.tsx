import type { Metadata } from "next"

import { UsersPageContent } from "@/modules/users/components/users-page-content"

export const metadata: Metadata = {
  title: "Users",
}

export default function UsersPage() {
  return <UsersPageContent />
}
