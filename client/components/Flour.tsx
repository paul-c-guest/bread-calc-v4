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
}

export const Flour = ({
  flour,
  mutateHydrationByDelete,
  mutateHydrationByUpdate,
  mutateFlourByDelete,
}: Props) => {
  const { user, getAccessTokenSilently } = useAuth0()

  const [hydration, setHydration] = useState(
    flour.alteredHydration ?? flour.defaultHydration,
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHydration(Number(event.target.value))
  }

  const handleUpdate = async () => {
    if (!user?.sub) return

    const override: Override = {
      owner: user.sub,
      flourId: flour.id,
      hydration: hydration,
    }

    if (hydration === flour.defaultHydration) {
      mutateHydrationByDelete.mutate(override)
    } else {
      mutateHydrationByUpdate.mutate(override)
    }
  }

  const handleRollback = () => {}

  const handleDelete = async () => {
    if (confirm(`Delete ${flour.name} from the database?`)) {
      const token = await getAccessTokenSilently()
      mutateFlourByDelete.mutate([flour.id, token])
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
          disabled={
            flour.alteredHydration
              ? flour.alteredHydration === hydration
              : flour.defaultHydration === hydration
          }
        >
          &#10003;
        </button>
      </td>
      <td>
        <button
          onClick={handleRollback}
          disabled={
            flour.alteredHydration
              ? flour.alteredHydration === hydration
              : flour.defaultHydration === hydration
          }
        >
          &#8634;
        </button>
      </td>
      <td>
        <button
          style={{ height: "2.35em" }}
          disabled={flour.owner === null}
          onClick={handleDelete}
        >
          &#128465;
        </button>
      </td>
    </tr>
  )
}
