// import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import { Navigate } from "react-router-dom"

import { Flour } from "./Flour"
import { deleteFlour, getFlours, putNewFlour } from "../api/flours"
import { deleteOverride, putOverride } from "../api/overrides"
import { useEffect, useState } from "react"
import { FlourData } from "../../models/flour"

const initialData: FlourData = {
  name: "",
  defaultHydration: 70,
  isGlutenFree: false,
}

export const FloursPage = () => {
  // const { isAuthenticated, isLoading: authIsLoading } = useAuth0()

  const { data: flourDb, isLoading: queryIsLoading } = useQuery(
    ["flours"],
    getFlours,
  )

  const [newFlour, setNewFlour] = useState<FlourData>(initialData)

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

  useEffect(() => {
    // console.log(newFlour)
  }, [newFlour])

  // const { data: user, isLoading: userIsLoading } = useQuery(["user"], () =>
  //   getUserByAuth("sdfger5t5r4rg54trf"),
  // )

  // console.log(user)

  // const { data: userOverrides, isLoading: overridesIsLoading } = useQuery(
  //   ["overrides"],
  //   () => getOverridesForUserId(user?.id),
  // )

  // console.log(userOverrides)

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    putNewFlour(newFlour)
    setNewFlour(initialData)
    queryClient.invalidateQueries(["flours"])
  }

  const queryClient = useQueryClient()

  const mutateHydrationByUpdate = useMutation(putOverride, {
    onSuccess: async () => queryClient.invalidateQueries(),
  })

  const mutateHydrationByDelete = useMutation(deleteOverride, {
    onSuccess: async () => queryClient.invalidateQueries(),
  })

  const mutateFlourByDelete = useMutation(deleteFlour, {
    onSuccess: async () => queryClient.invalidateQueries(),
  })

  // if (authIsLoading || queryIsLoading || overridesIsLoading || userIsLoading)
  //   return <p>...please wait...</p>
  if (
    // authIsLoading || 
    queryIsLoading) return <p>...please wait...</p>

  // if (!isAuthenticated) return <Navigate to={"/"} />

  return (
    <>
      <h2>Add New Flour</h2>
      <form onSubmit={submit}>
        <table>
          <tbody>
            <tr>
              <th>Name / Type</th>
              <th>Hydration</th>
              <th>Gluten Free?</th>
            </tr>
            <tr>
              <td>
                <input
                  onChange={handleInputChange}
                  type="text"
                  placeholder="flour..."
                  name="name"
                  value={newFlour.name}
                  required
                />
              </td>
              <td>
                <input
                  onChange={handleInputChange}
                  type="number"
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
            </tr>
          </tbody>
        </table>
        <button type="submit">Add New</button>
      </form>

      <hr />

      <details open={false}>
        <summary>
          <h2>All Flours</h2>
        </summary>
        <table>
          <tbody>
            <tr>
              <th>Flour Type</th>
              <th>Hydration</th>
            </tr>
            {flourDb?.map((flour) => (
              <Flour
                key={flour.id}
                mutateHydrationByDelete={mutateHydrationByDelete}
                mutateHydrationByUpdate={mutateHydrationByUpdate}
                mutateFlourByDelete={mutateFlourByDelete}
                flour={flour}
                // userId={user.id}
              />
            ))}
          </tbody>
        </table>
      </details>
      <hr />
    </>
  )
}
