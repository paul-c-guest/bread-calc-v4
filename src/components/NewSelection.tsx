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
  const initialValues: NewSelection = {
    flourId: flours[0].id,
    amount: 100,
    hydration: flours[0].defaultHydration,
  }

  const [selection, setSelection] = useState<NewSelection>(initialValues)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setEditing(selections.length === 0)
  }, [editing, selections])

  const selectionIds = selections.map((sel) => sel.flourId)

  const updateSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectionId = Number(event.target.value)
    const thisFlour = flours.find((flour) => flour.id === selectionId)

    if (!thisFlour) {
      return
    }

    setSelection({
      flourId: selectionId,
      amount: selection.amount,
      hydration: thisFlour.defaultHydration,
    })
  }

  const updateValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection({
      ...selection,
      [event.target.id]: Number(event.target.value),
    })
  }

  const submitNewSelection = () => {
    if (selection.amount && selection.hydration) {
      const thisFlour = flours.find((flour) => flour.id === selection.flourId)
      // console.log(thisFlour)

      const newSelection = {
        ...thisFlour,
        amount: selection.amount,
        alteredHydration:
          selection.hydration !== thisFlour?.defaultHydration
            ? selection.hydration
            : undefined,
      } as Selection

      addNewSelection(newSelection)

      setEditing(false)
      setSelection(initialValues)
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
            value={selection.amount}
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
            value={selection.hydration}
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
          <button onClick={() => setEditing(false)}>Reject</button>
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
