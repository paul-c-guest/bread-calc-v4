import { useState } from 'react'
import { Selection as SelectionModel } from '../models/flour'

interface Props {
  selection: SelectionModel
  deleteSelection: (id: number) => void
  updateSelection: (selection: SelectionModel) => void
}

export function Selection({ selection, deleteSelection, updateSelection }: Props) {
  const [flour, setFlour] = useState<SelectionModel>(selection)

  const removeSelection = () => {
    deleteSelection(selection.id)
  }

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
    updateSelection(newFlour)
  }

  return (
    <tr>
      <td>
        <input
          className="flour-entry-name"
          type="text"
          value={flour.name}
          readOnly
        />
      </td>
      <td>
        <input
          className="flour-entry-number"
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
          className="flour-entry-number"
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
        <button
          className="flour-delete-button"
          onClick={removeSelection}
        ></button>
      </td>
    </tr>
  )
}
