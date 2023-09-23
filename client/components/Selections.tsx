import React, { useState } from "react"

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
  addNewSelection: (selection: SelectionModel) => void
  deleteSelection: (id: number) => void
  updateSelection: (update: Update) => void
}

export function Selections({
  flours,
  selections,
  addNewSelection,
  deleteSelection,
  updateSelection,
}: Props) {
  const [open, setOpen] = useState(true)

  const orderSelectionsByAmount = () => {
    // todo - probably handle in App state?
  }

  return (
    <>
      <details
        open={open}
        onToggle={(event: React.ChangeEvent<HTMLDetailsElement>) =>
          setOpen(event.target.open)
        }
      >
        <summary className={open ? "details-open" : ""}>
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
              .map((selection) => {
                return (
                  <Selection
                    selection={selection}
                    deleteSelection={deleteSelection}
                    updateSelection={updateSelection}
                    key={selection.id}
                  />
                )
              })}

            <NewSelection
              flours={flours}
              selections={selections}
              addNewSelection={addNewSelection}
            />
          </tbody>
        </table>
      </details>
      <hr />
    </>
  )
}
