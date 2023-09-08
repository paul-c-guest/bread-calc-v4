import { Selection, Selections } from '../../models/flour'
import { StarterData } from '../../models/starter'

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

  // todo: remove some hydration from wet amount ot account for overhydration of starter
  // make a new api route to do getFlourById(starter.flourId)
  // use preferred hydration of returned flour to determine how much to subtract from wet total

  // get final expected hydration of dough
  const hydration: number = Number(((wet / dry) * 100).toFixed(0))

  return (
    <>
      <h2>Totals</h2>
      <table>
        <tbody>
          {/* <tr className="table-headings">
            <td className="center">Total Weight</td>
          </tr> */}
          <tr>
            <td className="total">{(wet + dry).toFixed(0)}g</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr className="table-headings">
            <td className="center">Dry</td>
            <td className="center">Wet</td>
            <td className="center">Hydration</td>
          </tr>
          <tr>
            <td className="center sub-total" id="dry-total">
              {dry.toFixed(0)}g
            </td>
            <td className="center sub-total" id="wet-total">
              {wet.toFixed(0)}ml
            </td>
            <td className="center sub-total" id="hydration-total">
              {!isNaN(hydration) ? hydration : 0}%
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
