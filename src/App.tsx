import { useState } from 'react'

import { Title } from './components/Title'
import { Selections } from './components/Selections'
import { Selection, Flour } from './models/flour'
import { Starter } from './components/Starter'
import { Calculations } from './components/Calculations'

export default function App() {
  // todo replace with useQuery
  const [selections, setSelections] = useState<Selection[]>(devData)

  const addNewSelection = (selection: Selection) => {
    setSelections([...selections, selection])
  }

  const deleteSelection = (id: number) => {
    // console.log(id)
    const requested = selections.find((selection) => selection.id === id)
    if (requested) {
      setSelections(selections.filter((selection) => selection.id !== id))
    }
  }

  return (
    <>
      <Title />
      <Selections
        flours={devFlours}
        selections={selections}
        addNewSelection={addNewSelection}
        deleteSelection={deleteSelection}
      />
      <Starter />
      <Calculations />
    </>
  )
}

const devFlours: Flour[] = [
  { id: 101, name: 'Wheat', defaultHydration: 75, isGlutenFree: false },
  { id: 102, name: 'Wholemeal', defaultHydration: 70, isGlutenFree: false },
  { id: 103, name: 'Rye', defaultHydration: 65, isGlutenFree: false },
  { id: 104, name: 'Rice', defaultHydration: 62, isGlutenFree: true },
  { id: 105, name: 'Tapioca', defaultHydration: 58, isGlutenFree: true },
  { id: 106, name: 'Spelt', defaultHydration: 63, isGlutenFree: false },
  { id: 107, name: 'Tapioca', defaultHydration: 58, isGlutenFree: true },
]

const devData: Selection[] = [
  {
    id: 1000,
    flourId: 101,
    name: 'Wheat',
    defaultHydration: 75,
    isGlutenFree: false,
    amount: 250,
  },
  {
    id: 1001,
    flourId: 103,
    name: 'Rye',
    defaultHydration: 65,
    alteredHydration: 72,
    isGlutenFree: false,
    amount: 150,
  },
  {
    id: 1002,
    flourId: 104,
    name: 'Rice',
    defaultHydration: 60,
    isGlutenFree: true,
    amount: 65,
  },
]
