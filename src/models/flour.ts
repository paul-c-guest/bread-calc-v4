export interface FlourData {
  name: string
  defaultHydration: number
  isGlutenFree: boolean
}

export interface Flour extends FlourData {
  id: number
}

export interface Selection extends Flour {
  amount: number
  alteredHydration?: number
}
