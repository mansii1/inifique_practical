"use client"

import Image from "next/image"
import { Eye, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { User } from "@/modules/users/types"

type Props = {
  users: User[]
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  deletingId?: number | null
}

export function UsersTable({
  users,
  onView,
  onEdit,
  onDelete,
  deletingId,
}: Props) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>User</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden sm:table-cell">Phone</TableHead>
            <TableHead className="hidden lg:table-cell">Age</TableHead>
            <TableHead className="hidden lg:table-cell">Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative size-9 shrink-0 overflow-hidden rounded-full bg-secondary">
                    <Image
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      fill
                      className="object-cover"
                      sizes="36px"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      @{user.username}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{user.email}</TableCell>
              <TableCell className="hidden sm:table-cell">{user.phone}</TableCell>
              <TableCell className="hidden lg:table-cell">{user.age}</TableCell>
              <TableCell className="hidden capitalize lg:table-cell">
                {user.role || "-"}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`View ${user.firstName}`}
                    onClick={() => onView(user)}
                  >
                    <Eye />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Edit ${user.firstName}`}
                    onClick={() => onEdit(user)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon-sm"
                    aria-label={`Delete ${user.firstName}`}
                    disabled={deletingId === user.id}
                    onClick={() => onDelete(user)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
