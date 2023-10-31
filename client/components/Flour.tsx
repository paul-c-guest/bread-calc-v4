import { useState } from "react"
import { Flour as FlourModel } from "../../models/flour"
import { Override } from "../../models/user"
import { UseMutationResult } from "@tanstack/react-query"
import { useAuth0 } from "@auth0/auth0-react"

interface Props {
  flour: FlourModel
  mutateHydrationByDelete: UseMutationResult<
    unknown,
    unknown,
    Override,
    unknown
  >
  mutateHydrationByUpdate: UseMutationResult<
    unknown,
    unknown,
    Override,
    unknown
  >
  mutateFlourByDelete: UseMutationResult<
    unknown,
    unknown,
    (string | number)[],
    unknown
  >
  // userId: number
}

export const Flour = ({
  flour,
  mutateHydrationByDelete,
  mutateHydrationByUpdate,
  mutateFlourByDelete, // userId,
}: Props) => {
  const { getAccessTokenSilently } = useAuth0()

  const [hydration, setHydration] = useState(flour.defaultHydration)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHydration(Number(event.target.value))
  }

  const handleUpdate = async () => {
    // const user = await getUserByAuth(sub)
    const override: Override = {
      userAuth0Sub: "user",
      flourId: flour.id,
      hydration: hydration,
    }

    if (hydration === flour.defaultHydration) {
      mutateHydrationByDelete.mutate(override)
    } else {
      mutateHydrationByUpdate.mutate(override)
    }
  }

  const handleDelete = async () => {
    if (confirm(`Delete ${flour.name} from the database?`)) {
      const id = flour.id
      const token = await getAccessTokenSilently()
      mutateFlourByDelete.mutate([id, token])
    }
  }

  return (
    <tr>
      <td>
        <input
          type="text"
          value={flour.name}
          style={{ width: "7.7em" }}
          readOnly
        />
      </td>
      <td>
        <input
          type="number"
          id="amount"
          value={hydration}
          onChange={handleChange}
        />
      </td>
      <td>
        <button
          onClick={handleUpdate}
          // disabled={hydration === flour.defaultHydration}
        >
          &#10003;
        </button>
      </td>
      <td>
        <button disabled={false}>&#8634;</button>
      </td>
      <td>
        <button style={{ height: "2.35em" }} onClick={handleDelete}>
          &#128465;
        </button>
      </td>
    </tr>
  )
}
