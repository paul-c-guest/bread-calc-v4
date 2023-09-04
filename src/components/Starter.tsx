import { Flour } from '../models/flour'
import { StarterData } from '../models/starter'

interface Props {
  flours: Flour[]
  starter: StarterData
  setStarter: React.Dispatch<React.SetStateAction<StarterData>>
}

export function Starter({
  flours,
  starter: starterData,
  setStarter: setStarterData,
}: Props) {
  const updateValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStarterData({
      ...starterData,
      [event.target.name]: Number(event.target.value),
    })
  }

  const updateSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStarterData({
      ...starterData,
      flourId: Number(event.target.value),
    })
  }

  return (
    <>
      <details>
        <summary>
          <h2>My Starter</h2>
        </summary>
        <table>
          <tbody>
            <tr className="table-headings">
              <td>Flour</td>
              <td>Dry (g)</td>
              <td>Wet (ml)</td>
              <td></td>
            </tr>

            <tr>
              <td>
                <select
                  name="flourId"
                  className="new-selection"
                  onChange={updateSelection}
                >
                  {flours.map((flour) => (
                    <option key={flour.id} value={flour.id}>
                      {flour.name}
                    </option>
                  ))}
                </select>{' '}
              </td>
              <td>
                <input
                  type="number"
                  step={5}
                  min={0}
                  className="flour-entry-number"
                  defaultValue={starterData.dry}
                  name="dry"
                  onChange={updateValues}
                />
              </td>
              <td>
                <input
                  type="number"
                  step={5}
                  min={0}
                  className="flour-entry-number"
                  defaultValue={starterData.wet}
                  name="wet"
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
          </tbody>
        </table>
      </details>
      <hr />
    </>
  )
}
