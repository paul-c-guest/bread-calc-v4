import { useState } from "react"
import { Flour as FlourModel } from "../../models/flour"
import { Override } from "../../models/user"
import { UseMutationResult } from "@tanstack/react-query"

interface Props {
  flour: FlourModel
  mutateByDelete: UseMutationResult<unknown, unknown, Override, unknown>
  mutateByUpdate: UseMutationResult<unknown, unknown, Override, unknown>
  // userId: number
}

export const Flour = ({
  flour,
  mutateByDelete,
  mutateByUpdate,
  // userId,
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
      mutateByDelete.mutate(override)
    } else {
      mutateByUpdate.mutate(override)
    }
  }

  return (
    <tr>
      <td>
        <input type="text" value={flour.name} readOnly />
      </td>
      <td>
        <input type="number" value={hydration} onChange={handleChange} />
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
    </tr>
  )
}
