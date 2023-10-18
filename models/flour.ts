export interface FlourData {
  name: string
  defaultHydration: number
  isGlutenFree: boolean
  owner?: string
}

export interface Flour extends FlourData {
  id: number
}

export interface Selection extends Flour {
  amount: number
  flourId: number
  position: number
  alteredHydration?: number
}

export type Selections = Record<number, Selection>
