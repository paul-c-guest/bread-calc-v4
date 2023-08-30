import { useState } from 'react'

import { Title } from './components/Title'
import { Selections } from './components/Selections'
import { Selection, Flour } from './models/flour'
import { Starter } from './components/Starter'
import { Calculations } from './components/Calculations'

// const initialSelectionData: Selection[] = []

export default function App() {
  // todo replace with useQuery
  const [selections, setSelections] = useState<Selection[]>(devData)

  return (
    <>
      <Title />
      <Selections
        flours={devFlours}
        selections={selections}
        setSelections={setSelections}
      />
      <Starter />
      <Calculations />
    </>
  )
}

const devFlours: Flour[] = [
  { id: 101, name: 'Wheat', defaultHydration: 75, isGlutenFree: false },
  {
    id: 102,
    name: 'Wholemeal Wheat',
    defaultHydration: 70,
    isGlutenFree: false,
  },
  { id: 103, name: 'Rye', defaultHydration: 65, isGlutenFree: false },
  { id: 104, name: 'Rice', defaultHydration: 60, isGlutenFree: true },
  { id: 105, name: 'Tapioca', defaultHydration: 60, isGlutenFree: true },
]

const devData: Selection[] = [
  {
    id: 101,
    name: 'Wheat',
    defaultHydration: 75,
    isGlutenFree: false,
    amount: 250,
  },
  {
    id: 102,
    name: 'Rye',
    defaultHydration: 65,
    alteredHydration: 72,
    isGlutenFree: false,
    amount: 150,
  },
  {
    id: 103,
    name: 'Rice',
    defaultHydration: 60,
    isGlutenFree: true,
    amount: 65,
  },
]
