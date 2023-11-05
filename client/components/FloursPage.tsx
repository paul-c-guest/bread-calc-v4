import { useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Flour } from "./Flour"
import { Flour as FlourModel, FlourData } from "../../models/flour"
import { deleteFlour, getFloursForOwner, putNewFlour } from "../api/flours"
import {
  getOverridesForOwner,
  createOverride,
  updateOverride,
  deleteOverride,
} from "../api/overrides"
import { Override } from "../../models/user"

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
      // sort reverse alphabetically first
      flours.sort(
        (a, b) =>
          b.name.toLowerCase().charCodeAt(0) -
          a.name.toLowerCase().charCodeAt(0),
      )
      // then sink any that don't have an owner
      flours.sort((a, b) => (a.owner === null && b.owner !== null ? 1 : -1))
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
    putNewFlour(newFlour, token)

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

  const mutateFlourByDelete = useMutation(deleteFlour, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  if (authIsLoading || floursAreLoading || overridesAreLoading)
    return <p>...please wait...</p>

  if (!isAuthenticated) return <Navigate to={"/"} />

  const overrideMap = new Map<number, Override>()
  overrides?.forEach((el) => overrideMap.set(el.flourId, el))
  const mapped = flours?.map((flour) => {
    return overrideMap.has(flour.id)
      ? ({
          id: flour.id,
          name: overrideMap.get(flour.id)?.name ?? flour.name,
          defaultHydration: flour.defaultHydration,
          alteredHydration: overrideMap.get(flour.id)?.hydration ?? undefined,
          isGlutenFree: flour.isGlutenFree,
          owner: null,
        } as FlourModel)
      : flour
  })
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
                mutateHydrationByDelete={mutateOverrideByDelete}
                mutateHydrationByUpdate={mutateOverrideByUpdate}
                mutateFlourByDelete={mutateFlourByDelete}
              />
            ))}
          </tbody>
        </table>
      </details>
    </>
  )
}
