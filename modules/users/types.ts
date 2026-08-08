export type UserAddress = {
  address: string
  city: string
  state: string
  stateCode?: string
  postalCode: string
  country: string
}

export type UserCompany = {
  department?: string
  name?: string
  title?: string
  address?: UserAddress
}

export type User = {
  id: number
  firstName: string
  lastName: string
  maidenName?: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password?: string
  birthDate?: string
  image: string
  bloodGroup?: string
  height?: number
  weight?: number
  eyeColor?: string
  hair?: {
    color: string
    type: string
  }
  address?: UserAddress
  university?: string
  company?: UserCompany
  role?: string
  isDeleted?: boolean
}

export type UserPayload = {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  username: string
  gender: string
}

export type UsersListParams = {
  q?: string
  limit: number
  skip: number
}

export type UsersListResponse = {
  users: User[]
  total: number
  skip: number
  limit: number
}
