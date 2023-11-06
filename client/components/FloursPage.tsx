import { useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Flour } from "./Flour"
import { FlourData } from "../../models/flour"
import {
  deleteFlour,
  getFloursForOwner,
  createFlour,
  updateFlour,
} from "../api/flours"
import {
  getOverridesForOwner,
  createOverride,
  updateOverride,
  deleteOverride,
} from "../api/overrides"
import { applyOverridesToSortedFlours } from "../util/sort"

const initialData: FlourData = {
  name: "",
  defaultHydration: 70,
  isGlutenFree: false,
}

export const FloursPage = () => {
  const {
    isAuthenticated,
    isLoading: authIsLoading,
    getAccessTokenSilently,
  } = useAuth0()

  const queryClient = useQueryClient()

  const { data: flours, isLoading: floursAreLoading } = useQuery(
    ["flours"],
    async () => {
      const token = await getAccessTokenSilently()
      const flours = await getFloursForOwner(token)
      return flours
    },
  )

  const { data: overrides, isLoading: overridesAreLoading } = useQuery(
    ["overrides"],
    async () => {
      const token = await getAccessTokenSilently()
      const overrides = await getOverridesForOwner(token)
      return overrides
    },
  )

  const [newFlour, setNewFlour] = useState<FlourData>(initialData)

  const [open, setOpen] = useState(true)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const update = { ...newFlour }
    const key = event.target.name

    switch (key) {
      case "name":
        update[key] = event.target.value
        break

      case "defaultHydration":
        update[key] = Number(event.target.value)
        break

      case "isGlutenFree":
        update[key] = event.target.checked
        break
    }

    setNewFlour(update)
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const token = await getAccessTokenSilently()
    createFlour(newFlour, token)

    // both invalidate and refetch seem to be required to always ensure list refreshes after new flour added
    await queryClient.invalidateQueries(["flours"])
    await queryClient.refetchQueries()

    setNewFlour(initialData)
  }

  const mutateOverrideByCreate = useMutation(createOverride, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  const mutateOverrideByUpdate = useMutation(updateOverride, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  const mutateOverrideByDelete = useMutation(deleteOverride, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  const mutateFlourByUpdate = useMutation(updateFlour, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  const mutateFlourByDelete = useMutation(deleteFlour, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  if (authIsLoading || floursAreLoading || overridesAreLoading)
    return <p>...please wait...</p>

  if (!isAuthenticated) return <Navigate to={"/"} />

  const mapped = applyOverridesToSortedFlours(flours, overrides)

  // console.log(...mapped)

  return (
    <>
      <h2>Add New Flour</h2>
      <form onSubmit={submit}>
        <table>
          <thead>
            <tr>
              <th style={{ width: "12em" }} className="first-col pad-right-col">
                Flour Name
              </th>
              <th>Hydration</th>
              <th className="checkbox-col pad-right-col">GF?</th>
              <th className="button-col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  id="new-flour-name"
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  value={newFlour.name}
                  required
                />
              </td>
              <td>
                <input
                  onChange={handleInputChange}
                  type="number"
                  id="amount"
                  placeholder="70"
                  name="defaultHydration"
                  min={0}
                  max={200}
                  step={1}
                  value={newFlour.defaultHydration}
                  required
                />
              </td>
              <td>
                <input
                  onChange={handleInputChange}
                  checked={newFlour.isGlutenFree}
                  className="checkbox"
                  type="checkbox"
                  name="isGlutenFree"
                />
              </td>
              <td>
                <button
                  disabled={!newFlour.name || isNaN(newFlour.defaultHydration)}
                  type="submit"
                >
                  &#10003;
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <hr />

      <details
        open={open}
        onToggle={(event: React.ChangeEvent<HTMLDetailsElement>) =>
          setOpen(event.target.open)
        }
      >
        <summary className={open ? "details-open" : ""}>
          <h2>All Flours</h2>
        </summary>
        <table>
          <tbody>
            <tr>
              <th
                style={{ width: "8.7em" }}
                className="first-col pad-right-col"
              >
                Flour
              </th>
              <th>Hydration</th>
              <th className="button-col pad-right-col"></th>
              <th className="button-col pad-right-col"></th>
              <th className="button-col"></th>
            </tr>
            {mapped?.map((flour) => (
              <Flour
                key={flour.id}
                flour={flour}
                mutateOverrideByCreate={mutateOverrideByCreate}
                mutateOverrideByDelete={mutateOverrideByDelete}
                mutateOverrideByUpdate={mutateOverrideByUpdate}
                mutateFlourByUpdate={mutateFlourByUpdate}
                mutateFlourByDelete={mutateFlourByDelete}
              />
            ))}
          </tbody>
        </table>
      </details>
    </>
  )
}
