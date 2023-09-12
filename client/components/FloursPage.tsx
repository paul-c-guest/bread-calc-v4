import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"
import { getFlours } from "../api/flours"
import { Flour } from "./Flour"
import { deleteOverride, putOverride } from "../api/overrides"

export const FloursPage = () => {
  const { isAuthenticated, isLoading: authIsLoading } = useAuth0()

  const { data: flourDb, isLoading: queryIsLoading } = useQuery(
    ["flours"],
    getFlours,
  )

  const queryClient = useQueryClient()

  const mutateByUpdate = useMutation(putOverride, {
    onSuccess: async () => queryClient.invalidateQueries(),
  })

  const mutateByDelete = useMutation(deleteOverride, {
    onSuccess: async () => queryClient.invalidateQueries(),
  })

  if (queryIsLoading || authIsLoading) return <p>...please wait...</p>

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
              />
            ))}
          </tbody>
        </table>
      </details>
      <hr />
    </>
  )
}
