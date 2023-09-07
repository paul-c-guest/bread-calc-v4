import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Title } from './components/Title'
import { Selections } from './components/Selections'
import { Selection, Selections as SelectionsModel } from '../models/flour'
import { Starter } from './components/Starter'
import { Totals } from './components/Totals'
import { StarterData } from '../models/starter'
import { Update } from '../models/update'
import { getFlours } from './api/flours'
import { Nav } from './components/Nav'
import { useAuth0 } from '@auth0/auth0-react'

export default function App() {
  const { user } = useAuth0()
  const { data: flourDb, isError, isLoading } = useQuery(['flours'], getFlours)

  const locallyStoredSelections: SelectionsModel =
    JSON.parse(localStorage.getItem('selections') ?? '') ?? devData
  console.log(locallyStoredSelections)

  const [selections, setSelections] = useState<SelectionsModel>(
    user ? locallyStoredSelections : devData
  )

  const [starter, setStarter] = useState<StarterData>(initialStarterData)

  useEffect(() => {
    if (user) {
      localStorage.setItem('selections', JSON.stringify(selections))
    }
  }, [selections, user])

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

    switch (update.key) {
      case 'defaultHydration':
        delete updated[update.id].alteredHydration
        break

      case 'alteredHydration':
        updated[update.id].alteredHydration = update.value
        break

      case 'amount':
        updated[update.id].amount = update.value
        break
    }

    setSelections(updated)
  }

  if (isError || isLoading) return <p>... please wait ...</p>

  return (
    <>
      <Nav />
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

const devData: SelectionsModel = {
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
  flourId: 103,
  wet: 100,
  dry: 100,
}
