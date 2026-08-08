"use client"

import { Button } from "@/components/ui/button"

type AppErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AppError({ error, reset }: AppErrorProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="text-sm text-muted-foreground">
        {error.message || "Please try again."}
      </p>
      <Button type="button" onClick={reset}>
        Try again
      </Button>
    </div>
  )
}
