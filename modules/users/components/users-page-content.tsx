"use client"

import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { getErrorMessage } from "@/lib/api/get-error-message"
import { UserDetailsDrawer } from "@/modules/users/components/user-details-drawer"
import { UserForm } from "@/modules/users/components/user-form"
import { UsersTable } from "@/modules/users/components/users-table"
import type { UserFormValues } from "@/modules/users/schemas/user-schema"
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "@/modules/users/services/users-api"
import type { User, UsersListResponse } from "@/modules/users/types"

const PAGE_SIZE = 10

export function UsersPageContent() {
  const queryClient = useQueryClient()

  const [searchInput, setSearchInput] = useState("")
  const [q, setQ] = useState("")
  const [page, setPage] = useState(1)

  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [viewUserId, setViewUserId] = useState<number | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    const t = setTimeout(() => {
      setQ(searchInput.trim())
      setPage(1)
    }, 400)
    return () => clearTimeout(t)
  }, [searchInput])

  const skip = (page - 1) * PAGE_SIZE

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["users", q, page],
    queryFn: () => getUsers({ q, limit: PAGE_SIZE, skip }),
    placeholderData: (prev) => prev,
  })

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (created) => {
      queryClient.setQueryData<UsersListResponse>(["users", q, page], (old) => {
        if (!old) return old
        return {
          ...old,
          users: [created, ...old.users],
          total: old.total + 1,
        }
      })
      setMsg(`Added ${created.firstName}`)
      setModalMode(null)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (values: UserFormValues) => updateUser(editUser!.id, values),
    onSuccess: (updated) => {
      queryClient.setQueriesData<UsersListResponse>(
        { queryKey: ["users"] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            users: old.users.map((u) =>
              u.id === updated.id ? { ...u, ...updated } : u
            ),
          }
        }
      )
      queryClient.setQueryData(["user", updated.id], updated)
      setMsg(`Updated ${updated.firstName}`)
      setModalMode(null)
      setEditUser(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (user: User) => deleteUser(user.id),
    onSuccess: (_res, user) => {
      queryClient.setQueriesData<UsersListResponse>(
        { queryKey: ["users"] },
        (old) => {
          if (!old) return old
          return {
            ...old,
            users: old.users.filter((u) => u.id !== user.id),
            total: Math.max(0, old.total - 1),
          }
        }
      )
      setMsg(`Deleted ${user.firstName}`)
      setDeleteTarget(null)
      if (data && data.users.length <= 1 && page > 1) {
        setPage((p) => p - 1)
      }
    },
  })

  const users = data?.users ?? []
  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / PAGE_SIZE))
  const formError =
    createMutation.isError || updateMutation.isError
      ? getErrorMessage(
          createMutation.error || updateMutation.error,
          "Could not save user"
        )
      : undefined

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search users..."
            className="pl-8"
          />
        </div>
        <Button
          type="button"
          onClick={() => {
            setEditUser(null)
            setModalMode("add")
            setMsg("")
          }}
        >
          <Plus className="size-4" />
          Add User
        </Button>
      </div>

      {msg && <p className="text-sm text-accent">{msg}</p>}

      {isError && (
        <p className="text-sm text-destructive">
          {getErrorMessage(error, "Failed to load users")}
        </p>
      )}

      {deleteMutation.isError && (
        <p className="text-sm text-destructive">
          {getErrorMessage(deleteMutation.error, "Delete failed")}
        </p>
      )}

      {isLoading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          Loading...
        </p>
      ) : users.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No users found
        </p>
      ) : (
        <div className={isFetching ? "opacity-70" : undefined}>
          <UsersTable
            users={users}
            onView={(user) => setViewUserId(user.id)}
            onEdit={(user) => {
              setEditUser(user)
              setModalMode("edit")
              setMsg("")
            }}
            onDelete={setDeleteTarget}
            deletingId={deleteMutation.isPending ? deleteTarget?.id : null}
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Page {Math.min(page, totalPages)} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <Modal
        open={modalMode !== null}
        title={modalMode === "edit" ? "Edit User" : "Add User"}
        onClose={() => {
          setModalMode(null)
          setEditUser(null)
        }}
      >
        <UserForm
          key={editUser?.id ?? "new"}
          submitLabel={modalMode === "edit" ? "Update" : "Add User"}
          defaultValues={
            editUser
              ? {
                  firstName: editUser.firstName,
                  lastName: editUser.lastName,
                  email: editUser.email,
                  phone: editUser.phone,
                  username: editUser.username,
                  age: editUser.age,
                  gender: editUser.gender,
                }
              : undefined
          }
          errorMessage={formError}
          onCancel={() => {
            setModalMode(null)
            setEditUser(null)
          }}
          onSubmit={async (values) => {
            if (modalMode === "edit") {
              await updateMutation.mutateAsync(values)
            } else {
              await createMutation.mutateAsync(values)
            }
          }}
        />
      </Modal>

      <UserDetailsDrawer
        open={viewUserId !== null}
        userId={viewUserId}
        onClose={() => setViewUserId(null)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this user?"
        description={
          deleteTarget
            ? `Remove ${deleteTarget.firstName} ${deleteTarget.lastName}?`
            : undefined
        }
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
        onCancel={() => {
          if (!deleteMutation.isPending) setDeleteTarget(null)
        }}
        onConfirm={() => {
          if (deleteTarget) deleteMutation.mutate(deleteTarget)
        }}
      />
    </div>
  )
}
