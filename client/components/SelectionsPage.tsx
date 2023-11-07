import { useEffect, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth0 } from "@auth0/auth0-react"

import { getDefaultFlours, getFloursForOwner } from "../api/flours"

import { Selections as SelectionsModel } from "../../models/flour"
import { StarterData } from "../../models/starter"

import { Selections } from "./Selections"
import { Starter } from "./Starter"
import { Totals } from "./Totals"
import { applyOverridesToSortedFlours } from "../util/sort"
import { getOverridesForOwner } from "../api/overrides"

export default function SelectionsPage() {
  const {
    getAccessTokenSilently,
    isLoading: authIsLoading,
    isAuthenticated,
  } = useAuth0()

  const queryClient = useQueryClient()

  const {
    data: flours,
    isError: floursQueryIsError,
    isLoading: floursAreLoading,
  } = useQuery(["flours"], async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently()
      const flours = await getFloursForOwner(token)
      return flours
    } else {
      const flours = await getDefaultFlours()
      return flours
    }
  })

  const { data: overrides, isLoading: overridesAreLoading } = useQuery(
    ["overrides"],
    async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently()
        const overrides = await getOverridesForOwner(token)
        return overrides
      } else {
        return []
      }
    },
  )
  const locallyStoredSelections = localStorage.getItem("selections")
  const locallyStoredStarter = localStorage.getItem("starter")

  const [selections, setSelections] = useState<SelectionsModel>(
    locallyStoredSelections && isAuthenticated
      ? JSON.parse(locallyStoredSelections)
      : defaultSelectionsData,
  )

  const [starter, setStarter] = useState<StarterData>(
    locallyStoredStarter && isAuthenticated
      ? JSON.parse(locallyStoredStarter)
      : defaultStarterData,
  )

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("selections", JSON.stringify(selections))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("starter", JSON.stringify(starter))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starter])

  useEffect(() => {
    if (isAuthenticated && locallyStoredSelections != null) {
      setSelections(JSON.parse(locallyStoredSelections))
    }

    if (isAuthenticated && locallyStoredStarter != null) {
      setStarter(JSON.parse(locallyStoredStarter))
    }

    queryClient.invalidateQueries()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  if (floursAreLoading || authIsLoading || overridesAreLoading)
    return <p>... please wait ...</p>

  if (floursQueryIsError) return <p>... something's wrong ...</p>

  const mapped = applyOverridesToSortedFlours(flours, overrides)

  return (
    <>
      <Selections
        flours={mapped}
        selections={selections}
        setSelections={setSelections}
      />
      <Starter flours={mapped} starter={starter} setStarter={setStarter} />
      <Totals selections={selections} starter={starter} />
    </>
  )
}

const defaultSelectionsData: SelectionsModel = {
  1000: {
    id: 1000,
    flourId: 101,
    name: "Wheat",
    defaultHydration: 75,
    isGlutenFree: false,
    amount: 300,
    position: 1,
  },
  1001: {
    id: 1001,
    flourId: 103,
    name: "Rye",
    defaultHydration: 65,
    alteredHydration: 72,
    isGlutenFree: false,
    amount: 150,
    position: 2,
  },
  1002: {
    id: 1002,
    flourId: 106,
    name: "Spelt",
    defaultHydration: 63,
    isGlutenFree: false,
    amount: 50,
    position: 3,
  },
}

const defaultStarterData: StarterData = {
  flourId: 103,
  dry: 70,
  wet: 80,
  hydration: 65,
}
