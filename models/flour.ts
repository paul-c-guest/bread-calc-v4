export interface FlourData {
  name: string
  defaultHydration: number
  isGlutenFree: boolean
  owner?: string | null
}

export interface Flour extends FlourData {
  id: number
  alteredHydration?: number
}

export interface Selection extends Flour {
  amount: number
  flourId: number
  position: number
}

export type Selections = Record<number, Selection>
