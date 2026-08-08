"use client"

import { Button } from "@/components/ui/button"

type Props = {
  open: boolean
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-lg border bg-background p-4 shadow-lg">
        <h2 className="font-semibold">{title}</h2>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
