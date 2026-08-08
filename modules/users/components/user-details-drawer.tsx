"use client"

import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import { Drawer } from "@/components/ui/drawer"
import { getErrorMessage } from "@/lib/api/get-error-message"
import { getUser } from "@/modules/users/services/users-api"

type Props = {
  userId: number | null
  open: boolean
  onClose: () => void
}

function Row({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium break-words">{value || "-"}</span>
    </div>
  )
}

export function UserDetailsDrawer({ userId, open, onClose }: Props) {
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId!),
    enabled: open && !!userId,
  })

  return (
    <Drawer
      open={open}
      title={user ? `${user.firstName} ${user.lastName}` : "User details"}
      onClose={onClose}
    >
      {isLoading && <p className="text-sm text-muted-foreground">Loading...</p>}

      {isError && (
        <p className="text-sm text-destructive">
          {getErrorMessage(error, "Could not load user")}
        </p>
      )}

      {user && (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="relative size-16 overflow-hidden rounded-full bg-secondary">
              <Image
                src={user.image}
                alt={user.firstName}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized
              />
            </div>
            <div>
              <p className="font-semibold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Basic
            </p>
            <Row label="Email" value={user.email} />
            <Row label="Phone" value={user.phone} />
            <Row label="Age" value={user.age} />
            <Row label="Gender" value={user.gender} />
            <Row label="Birth date" value={user.birthDate} />
            <Row label="Role" value={user.role} />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              More info
            </p>
            <Row label="Blood group" value={user.bloodGroup} />
            <Row label="Eye color" value={user.eyeColor} />
            <Row
              label="Hair"
              value={
                user.hair ? `${user.hair.color} / ${user.hair.type}` : undefined
              }
            />
            <Row label="Height" value={user.height} />
            <Row label="Weight" value={user.weight} />
            <Row label="University" value={user.university} />
          </div>

          {user.address && (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Address
              </p>
              <Row label="Street" value={user.address.address} />
              <Row label="City" value={user.address.city} />
              <Row label="State" value={user.address.state} />
              <Row label="Postal" value={user.address.postalCode} />
              <Row label="Country" value={user.address.country} />
            </div>
          )}

          {user.company && (
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Company
              </p>
              <Row label="Name" value={user.company.name} />
              <Row label="Title" value={user.company.title} />
              <Row label="Dept" value={user.company.department} />
            </div>
          )}
        </div>
      )}
    </Drawer>
  )
}
