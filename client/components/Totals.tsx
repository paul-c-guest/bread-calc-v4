import { Selection, Selections } from "../../models/flour"
import { StarterData } from "../../models/starter"

interface Props {
  selections: Selections
  starter: StarterData
}

export function Totals({ selections, starter }: Props) {
  let dry: number = 0
  let wet: number = 0

  // sum values for selections
  Object.values(selections).forEach((sel: Selection) => {
    dry += sel.amount
    wet += sel.amount * (sel.alteredHydration || sel.defaultHydration) * 0.01
  })

  // sum values for starter
  dry += starter.dry
  wet += starter.wet

  //  remove some hydration from total wet amount to account for overhydration of starter
  const starterExcessHydration =
    starter.wet - starter.wet * (starter.hydration * 0.01)

  wet -= starterExcessHydration

  // get final expected hydration of dough
  const hydration: number = Number(((wet / dry) * 100).toFixed(0))

  return (
    <>
      <h2>Totals</h2>

      <table>
        <tbody>
          <tr className="table-headings">
            <th className="center">Liquid To Add</th>
            <th className="center">Total Dough</th>
          </tr>
          <tr>
            <td className="total center">{(wet - starter.wet).toFixed(0)}ml</td>
            <td className="total center">{(wet + dry).toFixed(0)}g</td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            <th className="center">Final Hydration</th>
            <th className="center">Dry</th>
            <th className="center">Wet</th>
          </tr>
          <tr>
            <td className="center sub-total" id="hydration-total">
              {!isNaN(hydration) ? hydration : 0}%
            </td>
            <td className="center sub-total" id="dry-total">
              {dry.toFixed(0)}g
            </td>
            <td className="center sub-total" id="wet-total">
              {wet.toFixed(0)}ml
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
