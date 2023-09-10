import { Flour } from '../../models/flour'
import { StarterData } from '../../models/starter'

interface Props {
  flours: Flour[]
  starter: StarterData
  setStarter: React.Dispatch<React.SetStateAction<StarterData>>
}

export function Starter({ flours, starter, setStarter }: Props) {
  const updateValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStarter({
      ...starter,
      [event.target.name]: Number(event.target.value),
    })
  }

  const updateSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStarter({
      ...starter,
      flourId: Number(event.target.value),
    })
  }

  return (
    <>
      <details open={false}>
        <summary>
          <h2>My Starter</h2>
        </summary>

        <table>
          <tbody>
            <tr className="table-headings">
              <th>Flour</th>
              <th>Dry (g)</th>
              <th>Wet (ml)</th>
            </tr>
            <tr>
              <td>
                <select
                  name="flourId"
                  className="new-selection"
                  onChange={updateSelection}
                  value={starter.flourId}
                  aria-label="choose the starter's flour type"
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
                  type="number"
                  step={5}
                  min={0}
                  className={
                    starter.dry > 0
                      ? 'flour-entry-number'
                      : 'flour-entry-number warning'
                  }
                  defaultValue={starter.dry}
                  name="dry"
                  onChange={updateValues}
                  aria-label="amount of flour in starter in grams"
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  step={5}
                  min={0}
                  className={
                    starter.wet > 0
                      ? 'flour-entry-number'
                      : 'flour-entry-number warning'
                  }
                  defaultValue={starter.wet}
                  name="wet"
                  onChange={updateValues}
                  aria-label="amount of liquid in starter in millilitres"
                  required
                />
              </td>
              {/* <td>
                <button
                  className="flour-delete-button"
                  style={{ visibility: 'hidden' }}
                ></button>
              </td> */}
            </tr>
          </tbody>
        </table>
      </details>
      <hr />
    </>
  )
}
