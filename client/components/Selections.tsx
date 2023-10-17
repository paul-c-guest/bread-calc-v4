import React, { useEffect, useState } from "react"

import {
  Flour as FlourModel,
  Selection as SelectionModel,
  Selections as SelectionsModel,
} from "../../models/flour"
import { Update } from "../../models/update"
import { NewSelection } from "./NewSelection"
import { Selection } from "./Selection"

interface Props {
  flours: FlourModel[]
  selections: SelectionsModel
  setSelections: React.Dispatch<React.SetStateAction<SelectionsModel>>
}

export function Selections({ flours, selections, setSelections }: Props) {
  const getUnusedFlours = (): FlourModel[] => {
    const selected: number[] = Object.values(selections).map(
      (selection) => selection.flourId,
    )
    return flours.filter((flour) => !selected.includes(flour.id))
  }

  const [available, setAvailable] = useState<FlourModel[]>(getUnusedFlours())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setAvailable(getUnusedFlours()), [selections])

  const [selectionsIsOpen, setSelectionsIsOpen] = useState(true)

  const orderSelectionsByAmount = () => {
    // todo - probably handle in App state?
  }

  const addNewSelection = (selection: SelectionModel) =>
    setSelections({ ...selections, [selection.id]: selection })

  const deleteSelection = (id: number) => {
    const updated = { ...selections }
    delete updated[id]
    setSelections(updated)
  }

  const updateSelection = (update: Update) => {
    const updated = { ...selections }

    const flour: FlourModel | undefined = flours.find(
      (flour) => flour.id === update.id,
    )

    switch (update.type) {
      case "flour":
        // find and delete the flour at the replacement position
        for (const record in updated) {
          if (updated[record].position === update.position) {
            delete updated[record]
            break
          }
        }

        // insert the replacement
        updated[update.id] = {
          ...flour,
          amount: update.value,
          position: update.position,
          flourId: flour!.id,
        } as SelectionModel

        break

      case "defaultHydration":
        delete updated[update.id].alteredHydration
        break

      case "alteredHydration":
        updated[update.id].alteredHydration = update.value
        break

      case "amount":
        updated[update.id].amount = update.value
        break
    }

    setSelections(updated)
  }

  return (
    <>
      <details
        open={selectionsIsOpen}
        onToggle={(event: React.ChangeEvent<HTMLDetailsElement>) =>
          setSelectionsIsOpen(event.target.open)
        }
      >
        <summary className={selectionsIsOpen ? "details-open" : ""}>
          <h2>My Selections</h2>
        </summary>

        <table>
          <tbody>
            <tr>
              <th className="first-col pad-right-col">Flour</th>
              <th onClick={orderSelectionsByAmount}>Amount</th>
              <th>Hydration</th>
              <th className="button-col"></th>
            </tr>
            {Object.values(selections)
              .sort((a, b) => a.position - b.position)
              .map((selection) => (
                <Selection
                  available={available}
                  selection={selection}
                  deleteSelection={deleteSelection}
                  updateSelection={updateSelection}
                  key={selection.id}
                />
              ))}

            <NewSelection
              flours={flours}
              selections={selections}
              available={available}
              addNewSelection={addNewSelection}
            />
          </tbody>
        </table>
      </details>
      <hr />
    </>
  )
}
