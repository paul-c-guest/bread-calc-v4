import { Selection as SelectionModel } from '../models/flour'
import { Selection } from './Selection'

interface Props {
  selections: SelectionModel[]
}

export function Selections({ selections }: Props) {
  return (
    <>
      <details open={true}>
        <summary>
          <h2>My Selections</h2>
        </summary>

        <table id="flour-block">
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

            <tr id="flour-block-button-row">
              {/* <td>new flour dropdown or selection menu</td> */}
            </tr>
          </tbody>
        </table>
      </details>
      <hr />
    </>
  )
}
