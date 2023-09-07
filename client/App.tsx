import { useEffect, useState } from 'react'

import { Title } from './components/Title'
import { Selections } from './components/Selections'
import { Selection, Flour } from '../models/flour'
import { Starter } from './components/Starter'
import { Totals } from './components/Totals'
import { StarterData } from '../models/starter'
import { Update } from '../models/update'

export default function App() {
  // todo replace with useQuery
  const [selections, setSelections] =
    useState<Record<number, Selection>>(devData)

  const [starter, setStarter] = useState<StarterData>(initialStarterData)

  useEffect(() => {
    // console.log(starterData)
  }, [starter])

  const addNewSelection = (selection: Selection) => {
    setSelections({ ...selections, [selection.id]: selection })
  }

  const deleteSelection = (id: number) => {
    const updated = { ...selections }
    delete updated[id]
    setSelections(updated)
  }

  const updateSelection = (update: Update) => {
    const updated = { ...selections }

    if (update.key === 'defaultHydration') {
      delete updated[update.id].alteredHydration
    } else {
      updated[update.id].defaultHydration = update.value
    }

    // console.log(update, updated[update.id][update.key])

    setSelections(updated)
  }

  return (
    <>
      <Title />
      <Selections
        flours={flourDb}
        selections={selections}
        addNewSelection={addNewSelection}
        deleteSelection={deleteSelection}
        updateSelection={updateSelection}
      />
      <Starter starter={starter} setStarter={setStarter} flours={flourDb} />
      <Totals selections={selections} starter={starter} />
    </>
  )
}

const flourDb: Flour[] = [
  { id: 101, name: 'Wheat', defaultHydration: 75, isGlutenFree: false },
  { id: 102, name: 'Wholemeal', defaultHydration: 70, isGlutenFree: false },
  { id: 103, name: 'Rye', defaultHydration: 65, isGlutenFree: false },
  { id: 104, name: 'Rice', defaultHydration: 62, isGlutenFree: true },
  { id: 105, name: 'Tapioca', defaultHydration: 58, isGlutenFree: true },
  { id: 106, name: 'Spelt', defaultHydration: 63, isGlutenFree: false },
  { id: 107, name: 'Buckwheat', defaultHydration: 53, isGlutenFree: true },
]

const devData: Record<string, Selection> = {
  1000: {
    id: 1000,
    flourId: 101,
    name: 'Wheat',
    defaultHydration: 75,
    isGlutenFree: false,
    amount: 310,
    position: 1,
  },
  1001: {
    id: 1001,
    flourId: 103,
    name: 'Rye',
    defaultHydration: 65,
    alteredHydration: 72,
    isGlutenFree: false,
    amount: 150,
    position: 2,
  },
  1002: {
    id: 1002,
    flourId: 106,
    name: 'Spelt',
    defaultHydration: 63,
    isGlutenFree: false,
    amount: 40,
    position: 3,
  },
}

const initialStarterData: StarterData = {
  flourId: flourDb[2].id || undefined,
  wet: 100,
  dry: 100,
}
