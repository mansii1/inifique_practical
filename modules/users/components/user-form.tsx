"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  userSchema,
  type UserFormValues,
} from "@/modules/users/schemas/user-schema"

const emptyValues: UserFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  username: "",
  age: 18,
  gender: "male",
}

const inputClass =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive dark:bg-input/30"

type Props = {
  defaultValues?: Partial<UserFormValues>
  submitLabel: string
  onSubmit: (values: UserFormValues) => Promise<void>
  onCancel: () => void
  errorMessage?: string
}

export function UserForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onCancel,
  errorMessage,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: yupResolver(userSchema),
    defaultValues: { ...emptyValues, ...defaultValues },
  })

  return (
    <form
      className="space-y-3"
      noValidate
      onSubmit={handleSubmit((values) => onSubmit(values))}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="firstName">First name</Label>
          <input
            id="firstName"
            className={inputClass}
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-xs text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="lastName">Last name</Label>
          <input
            id="lastName"
            className={inputClass}
            aria-invalid={!!errors.lastName}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-xs text-destructive">{errors.lastName.message}</p>
          )}
        </div>

        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            type="email"
            className={inputClass}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone">Phone</Label>
          <input
            id="phone"
            className={inputClass}
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <input
            id="username"
            className={inputClass}
            aria-invalid={!!errors.username}
            {...register("username")}
          />
          {errors.username && (
            <p className="text-xs text-destructive">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <input
            id="age"
            type="number"
            min={1}
            className={inputClass}
            aria-invalid={!!errors.age}
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age && (
            <p className="text-xs text-destructive">{errors.age.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="gender">Gender</Label>
          <select
            id="gender"
            className={inputClass}
            aria-invalid={!!errors.gender}
            {...register("gender")}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-xs text-destructive">{errors.gender.message}</p>
          )}
        </div>
      </div>

      {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  )
}
