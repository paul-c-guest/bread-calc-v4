import {
  Flour as FlourModel,
  Selection as SelectionModel,
} from '../models/flour'
import { NewSelection } from './NewSelection'
import { Selection } from './Selection'

interface Props {
  flours: FlourModel[]
  selections: SelectionModel[]
  addNewSelection: (selection: SelectionModel) => void
  deleteSelection: (id: number) => void
}

export function Selections({
  flours,
  selections,
  addNewSelection,
  deleteSelection,
}: Props) {
  return (
    <>
      <details open={true}>
        <summary>
          <h2>My Selections</h2>
        </summary>

        <table>
          <tbody>
            <tr className="table-headings">
              <td>Flour</td>
              <td>Amount</td>
              <td>Hydration</td>
              <td></td>
            </tr>

            {selections.map((selection) => {
              return (
                <Selection
                  selection={selection}
                  deleteSelection={deleteSelection}
                  key={Math.random()}
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
