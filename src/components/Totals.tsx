import { Selection } from '../models/flour'
import { StarterData } from '../models/starter'

interface Props {
  selections: Selection[]
  starter: StarterData
}

export function Totals({ selections, starter }: Props) {
  let wet: number = 0
  let dry: number = 0

  selections.forEach((sel) => {
    dry += sel.amount
    wet += sel.amount * (sel.alteredHydration || sel.defaultHydration) * 0.01
    console.log(wet, dry, wet / dry)
  })

  return (
    <>
      <h2>Totals</h2>
      <table>
        <tbody>
          {/* <tr className="table-headings">
            <td className="center">Total Weight</td>
          </tr> */}
          <tr>
            <td className="total">
              {(wet + dry).toFixed(0)}g
            </td>
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
              {((wet / dry) * 100).toFixed(0)}%
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
/**

 // make consts wet and dry
 // ensure values are integers

 // dry is basic addition
    dry += thisDry

    // wet is a percentage of dry
    wet += thisDry * thisHydration * 0.01

    // visually highlight inputs when invalid
    amountInputEl.setAttribute(
      'style',
      thisDry ? 'background-color: none' : 'background-color: #f003'
    )

    hydrInputEl.setAttribute(
      'style',
      thisHydration ? 'background-color: none' : 'background-color: #f003'
    )
  }

  // add values from starter
  // starter-dry/wet
  dry += parseInt(starterDryAmount.value)
  wet += parseInt(starterWetAmount.value)

  // calculate hydration before rounding wet & dry values
  let hydration = Math.round((wet / dry) * 100)

  // remove messy decimal information
  dry = Math.round(dry)
  wet = Math.round(wet)

  // correct for incidental divisions by zero
  if (isNaN(hydration)) {
    hydration = 0
  }

  // check if dry and wet are valid numbers
  const valid = !isNaN(dry) && !isNaN(wet)

  // update the html elements
  dryTotal.innerHTML = valid ? dry + 'g' : NAN_STRING
  wetTotal.innerHTML = valid ? wet + 'ml' : NAN_STRING
  hydrationTotal.innerHTML = valid ? hydration + '%' : NAN_STRING
  doughTotal.innerHTML = valid ? dry + wet + 'g' : NAN_STRING
  
  */
