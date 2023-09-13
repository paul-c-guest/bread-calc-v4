import { useState } from "react"
import { Flour as FlourModel } from "../../models/flour"
import { Override } from "../../models/user"
import { UseMutationResult } from "@tanstack/react-query"

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
  mutateFlourByDelete: UseMutationResult<FlourModel, unknown, number, unknown>
  // userId: number
}

export const Flour = ({
  flour,
  mutateHydrationByDelete,
  mutateHydrationByUpdate,
  mutateFlourByDelete, // userId,
}: Props) => {
  const [hydration, setHydration] = useState(flour.defaultHydration)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHydration(Number(event.target.value))
  }

  const handleUpdate = async () => {
    // const user = await getUserByAuth(sub)
    const override: Override = {
      // userId,
      flourId: flour.id,
      hydrationOverride: hydration,
    }

    if (hydration === flour.defaultHydration) {
      mutateHydrationByDelete.mutate(override)
    } else {
      mutateHydrationByUpdate.mutate(override)
    }
  }

  const handleDelete = () => {
    if (confirm(`Delete ${flour.name} from the database?`))
      mutateFlourByDelete.mutate(flour.id)
  }

  return (
    <tr>
      <td>
        <input type="text" value={flour.name} readOnly />
      </td>
      <td>
        <input
          type="number"
          className="flour-entry-number"
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
