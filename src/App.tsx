import { useState } from 'react'
import Title from './components/Title'
import { Selections } from './components/Selections'
import { Selection } from './models/flour'
import { Starter } from './components/Starter'
import { Calculations } from './components/Calculations'

// const initialSelectionData: Selection[] = []

export default function App() {
  // todo replace with useQuery
  const [selections, setSelections] = useState(devData)

  return (
    <>
      <Title />
      <Selections selections={selections} />
      <Starter />
      <Calculations />
    </>
  )
}

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
