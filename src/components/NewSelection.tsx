import { useEffect, useState } from 'react'
import { Flour, Selection } from '../models/flour'

interface Props {
  flours: Flour[]
  selections: Selection[]
  addNewSelection: (selection: Selection) => void
}

interface NewSelection {
  flourId: number
  amount: number
  hydration: number
}

export function NewSelection({ flours, selections, addNewSelection }: Props) {
  const selectionIds = selections.map((sel) => sel.flourId)

  const initialFlours = flours.filter(
    (flour) => !selectionIds.includes(flour.id)
  )

  const initialValues: NewSelection = {
    flourId: initialFlours[0].id,
    amount: 100,
    hydration: initialFlours[0].defaultHydration,
  }

  // todo update available flours after a new selection is added

  const [selectionValues, setSelectionValues] =
    useState<NewSelection>(initialValues)

  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setEditing(selections.length === 0)
  }, [selections])

  const updateSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectionId = Number(event.target.value)
    const thisFlour = flours.find((flour) => flour.id === selectionId)

    if (!thisFlour) {
      return
    }

    setSelectionValues({
      flourId: selectionId,
      amount: selectionValues.amount,
      hydration: thisFlour.defaultHydration,
    })
  }

  const updateValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectionValues({
      ...selectionValues,
      [event.target.id]: Number(event.target.value),
    })
  }

  const submitNewSelection = () => {
    if (selectionValues.amount && selectionValues.hydration) {
      const thisFlour = flours.find(
        (flour) => flour.id === selectionValues.flourId
      )
      // console.log(thisFlour)

      const newSelection = {
        ...thisFlour,
        amount: selectionValues.amount,
        alteredHydration:
          selectionValues.hydration !== thisFlour?.defaultHydration
            ? selectionValues.hydration
            : undefined,
      } as Selection

      addNewSelection(newSelection)

      setEditing(false)
      setSelectionValues(initialValues)
    }
  }

  return editing ? (
    <>
      <tr>
        <td>
          <select
            name="new-selection"
            id="flourId"
            className="new-selection"
            defaultValue={flours[0].name}
            onChange={updateSelection}
          >
            {flours
              .filter((flour) => !selectionIds.includes(flour.id))
              .map((flour) => (
                <option key={flour.id} value={flour.id}>
                  {flour.name}
                </option>
              ))}
          </select>
        </td>
        <td>
          <input
            id="amount"
            className="flour-entry-number"
            type="number"
            min={0}
            step={10}
            value={selectionValues.amount}
            onChange={updateValues}
          />
        </td>
        <td>
          <input
            id="hydration"
            className="flour-entry-number"
            type="number"
            min={0}
            step={1}
            value={selectionValues.hydration}
            onChange={updateValues}
          />
        </td>
        <td>
          <button
            className="flour-delete-button"
            style={{ visibility: 'hidden' }}
          ></button>
        </td>
      </tr>
      <tr>
        <td>
          <button onClick={submitNewSelection}>Accept</button>
          <button onClick={() => setEditing(selections.length ? false : true)}>
            Reject
          </button>
        </td>
      </tr>
    </>
  ) : (
    <>
      <tr>
        <td>
          <button onClick={() => setEditing(true)}>Add Selection</button>
        </td>
      </tr>
    </>
  )
}
