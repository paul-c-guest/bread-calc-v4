import { useEffect, useState } from 'react'
import { Flour, Selection } from '../models/flour'

interface Props {
  flours: Flour[]
  selections: Record<number, Selection>
  addNewSelection: (selection: Selection) => void
}

interface NewSelection {
  flourId: number
  amount: number
  hydration: number
}

export function NewSelection({ flours, selections, addNewSelection }: Props) {
  const selectionIds = Object.values(selections).map((sel) => sel.flourId)

  const unusedFlours = flours.filter(
    (flour) => !selectionIds.includes(flour.id)
  )

  const initialValues: NewSelection = unusedFlours.length
    ? {
        flourId: unusedFlours[0].id,
        amount: 100,
        hydration: unusedFlours[0].defaultHydration,
      }
    : ({} as NewSelection)

  const [selectionValues, setSelectionValues] =
    useState<NewSelection>(initialValues)

  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setEditing(Object.keys(selections).length === 0)
  }, [selections])

  // break early if no need to render elements...
  if (unusedFlours.length === 0) return <></>

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

      if (!thisFlour) return

      const getNextPosition = () => {
        return (
          1 +
          Object.values(selections)
            .map((sel) => sel.position)
            .reduce((previous, current) => {
              return current > previous ? current : previous
            }, 1)
        )
      }

      // console.log(getNextPosition())

      const newSelection: Selection = {
        ...thisFlour,
        position: getNextPosition(),
        flourId: thisFlour.id,
        amount: selectionValues.amount,
        alteredHydration:
          selectionValues.hydration !== thisFlour?.defaultHydration
            ? selectionValues.hydration
            : undefined,
      }

      console.log(newSelection)

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
          <button
            onClick={() =>
              setEditing(Object.keys(selections).length ? false : true)
            }
          >
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
