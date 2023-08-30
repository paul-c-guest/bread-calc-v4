import {
  Flour as FlourModel,
  Selection as SelectionModel,
} from '../models/flour'
import { NewSelection } from './NewSelection'
import { Selection } from './Selection'

interface Props {
  flours: FlourModel[]
  selections: SelectionModel[]
  setSelections: React.Dispatch<React.SetStateAction<SelectionModel[]>>
}

export function Selections({ flours, selections, setSelections }: Props) {
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

            {selections.map((sel) => {
              return <Selection selection={sel} key={sel.id} />
            })}

            <NewSelection flours={flours} setSelections={setSelections} />
          </tbody>
        </table>
      </details>
      <hr />
    </>
  )
}
