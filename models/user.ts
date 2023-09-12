export interface UserData {
  auth0id: string
  username: string
  name: string
}

export interface User extends UserData {
  id: number
}

export interface Override {
  flourId: number
  userId?: number
  hydrationOverride: number
}
