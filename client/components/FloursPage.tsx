import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"

import { Flour } from "./Flour"
import { getFlours } from "../api/flours"
import {
  deleteOverride,
  getOverridesForUserId,
  putOverride,
} from "../api/overrides"
import { getUserByAuth } from "../api/users"

export const FloursPage = () => {
  const {
    user: auth0User,
    isAuthenticated,
    isLoading: authIsLoading,
  } = useAuth0()

  const { data: flourDb, isLoading: queryIsLoading } = useQuery(
    ["flours"],
    getFlours,
  )

  const { data: user, isLoading: userIsLoading } = useQuery(
    ["user"],
    () => getUserByAuth('sdfger5t5r4rg54trf'),
  )

  console.log(user);
  

  const { data: userOverrides, isLoading: overridesIsLoading } = useQuery(
    ["overrides"],
    () =>  getOverridesForUserId(user?.id),
  )

  console.log(userOverrides)

  const queryClient = useQueryClient()

  const mutateByUpdate = useMutation(putOverride, {
    onSuccess: async () => queryClient.invalidateQueries(),
  })

  const mutateByDelete = useMutation(deleteOverride, {
    onSuccess: async () => queryClient.invalidateQueries(),
  })

  if (authIsLoading || queryIsLoading || overridesIsLoading || userIsLoading)
    return <p>...please wait...</p>

  if (!isAuthenticated) return <Navigate to={"/"} />

  return (
    <>
      <details open={true}>
        <summary>
          <h2>Flours</h2>
        </summary>
        <table>
          <tbody>
            <tr>
              <th>Flour Type</th>
              <th>Preferred Hydration</th>
            </tr>
            {flourDb?.map((flour) => (
              <Flour
                key={flour.id}
                mutateByDelete={mutateByDelete}
                mutateByUpdate={mutateByUpdate}
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
