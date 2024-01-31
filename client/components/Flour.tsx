import React, { useState } from "react"
import { Flour as FlourModel } from "../../models/flour"
import { Override } from "../../models/user"
import { UseMutationResult } from "@tanstack/react-query"
import { useAuth0 } from "@auth0/auth0-react"

interface Props {
  flour: FlourModel
  mutateOverrideByCreate: UseMutationResult<
    Override,
    unknown,
    Override,
    unknown
  >
  mutateOverrideByDelete: UseMutationResult<unknown, unknown, Override, unknown>
  mutateOverrideByUpdate: UseMutationResult<unknown, unknown, Override, unknown>
  mutateFlourByUpdate: UseMutationResult<
    FlourModel,
    unknown,
    (string | FlourModel)[],
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
  mutateOverrideByCreate,
  mutateOverrideByDelete,
  mutateOverrideByUpdate,
  mutateFlourByUpdate,
  mutateFlourByDelete,
}: Props) => {
  const { user, getAccessTokenSilently } = useAuth0()

  const [inputHydration, setInputHydration] = useState<number>(
    flour.alteredHydration ?? flour.defaultHydration,
  )

  const handleHydrationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputHydration(Number(event.target.value))
  }

  const [inputName, setInputName] = useState<string>(flour.name)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(String(event.target.value))
  }

  const handleAccept = async () => {
    if (!user?.sub) {
      // user is anonymous - save an override to localstorage (will be an Override since anon user can not add own flours)

      // make an Override object

      // delete / update / create the local override (same logical check as below) by updating the 'overrides' object in localstorage 

      return
    }

    // handle hydration amount change
    if (flour.owner) {
      // manage properties for a user's flour
      const token = await getAccessTokenSilently()
      const update: FlourModel = {
        ...flour,
        name: inputName,
        defaultHydration: inputHydration,
      }
      mutateFlourByUpdate.mutate([update, token])
    } else {
      // manage overrides for a default flour
      const override: Override = {
        owner: user.sub,
        flourId: flour.id,
        hydration: inputHydration,
      }

      if (inputHydration === flour.defaultHydration) {
        mutateOverrideByDelete.mutate(override)
      } else if (flour.alteredHydration) {
        mutateOverrideByUpdate.mutate(override)
      } else {
        mutateOverrideByCreate.mutate(override)
      }
    }
  }

  const handleRollback = () => {
    if (!user?.sub) return

    const override: Override = {
      owner: user.sub,
      flourId: flour.id,
      hydration: inputHydration,
    }

    if (flour.alteredHydration && inputHydration !== flour.alteredHydration) {
      setInputHydration(flour.alteredHydration)
      setInputName(flour.name)
      return
    } else {
      setInputHydration(flour.defaultHydration)
      setInputName(flour.name)
      mutateOverrideByDelete.mutate(override)
    }
  }

  const handleDelete = async () => {
    if (confirm(`Delete ${flour.name} from your database?`)) {
      const token = await getAccessTokenSilently()
      mutateFlourByDelete.mutate([flour.id, token])
    }
  }

  return (
    <tr>
      <td>
        {flour.owner ? (
          <input
            type="text"
            id="name"
            value={inputName}
            style={{ width: "7.7em" }}
            onChange={handleNameChange}
          ></input>
        ) : (
          <input
            type="text"
            value={flour.name}
            style={{ width: "7.7em" }}
            readOnly
          />
        )}
      </td>
      <td>
        <input
          type="number"
          id="amount"
          value={inputHydration}
          onChange={handleHydrationChange}
        />
      </td>
      <td>
        <button
          onClick={handleAccept}
          disabled={
            flour.name !== inputName || flour.alteredHydration
              ? flour.alteredHydration === inputHydration
              : flour.defaultHydration === inputHydration
          }
        >
          &#10003;
        </button>
      </td>
      <td>
        <button
          onClick={handleRollback}
          disabled={
            flour.name !== inputName || flour.alteredHydration
              ? flour.alteredHydration === flour.defaultHydration
              : flour.defaultHydration === inputHydration
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
