import { useState } from 'react'
import { Flour, Selection } from '../models/flour'

interface Props {
  flours: Flour[]
  setSelections: React.Dispatch<React.SetStateAction<Selection[]>>
}

interface NewSelection {
  flourId: number
  amount: number
  hydration: number
}

export function NewSelection({ flours, setSelections }: Props) {
  const initialValues: NewSelection = {
    flourId: flours[0].id,
    amount: 100,
    hydration: flours[0].defaultHydration,
  }

  const [selection, setSelection] = useState<NewSelection>(initialValues)
  const [editing, setEditing] = useState(false)

  const updateSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectionId = Number(event.target.value)
    setSelection({
      [event.target.id]: selectionId,
      amount: selection.amount,
      hydration: flours.find((flour) => flour.id === selectionId)
        ?.defaultHydration,
    })
  }

  const updateValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection({
      ...selection,
      [event.target.id]: Number(event.target.value),
    })
  }

  return editing ? (
    <>
      <tr>
        <td>
          <select
            name="new-selection"
            id="flourId"
            className="new-selection"
            placeholder="add new..."
            onChange={updateSelection}
          >
            {flours.map((flour) => (
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
        <td></td>
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
