import { useState } from 'react'
import { Selection as SelectionModel } from '../models/flour'

interface Props {
  selection: SelectionModel
}

export function Selection({ selection }: Props) {
  const [flour, setFlour] = useState<SelectionModel>(selection)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFlour = { ...flour }
    const newValue: number = Number(event.target.value)

    switch (event.target.id) {
      case 'amount':
        newFlour.amount = newValue
        break

      case 'hydration':
        if (newValue !== selection.defaultHydration) {
          newFlour.alteredHydration = newValue
        } else {
          delete newFlour.alteredHydration
        }
    }

    setFlour(newFlour)
  }

  return (
    <tr>
      <td>
        <p>{flour.name}</p>
      </td>
      <td>
        <input
          id="amount"
          onChange={handleChange}
          type="number"
          min={0}
          step={10}
          value={flour.amount}
        />
      </td>
      <td>
        <input
          id="hydration"
          onChange={handleChange}
          type="number"
          min={0}
          max={200}
          step={1}
          value={flour.alteredHydration || flour.defaultHydration}
        />
      </td>
      <td>
        <button className="flour-delete-button"></button>
      </td>
    </tr>
  )
}
