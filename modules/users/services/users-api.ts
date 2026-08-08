import { api } from "@/lib/api/axios"
import type {
  User,
  UserPayload,
  UsersListParams,
  UsersListResponse,
} from "@/modules/users/types"

export async function getUsers(params: UsersListParams) {
  const q = params.q?.trim()
  const url = q ? "/users/search" : "/users"

  const { data } = await api.get<UsersListResponse>(url, {
    params: {
      limit: params.limit,
      skip: params.skip,
      ...(q ? { q } : {}),
    },
  })

  return data
}

export async function getUser(id: number) {
  const { data } = await api.get<User>(`/users/${id}`)
  return data
}

export async function createUser(payload: UserPayload) {
  const { data } = await api.post<User>("/users/add", payload)
  return data
}

export async function updateUser(id: number, payload: UserPayload) {
  const { data } = await api.put<User>(`/users/${id}`, payload)
  return data
}

export async function deleteUser(id: number) {
  const { data } = await api.delete<User>(`/users/${id}`)
  return data
}
