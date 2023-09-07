import { Selection as SelectionModel } from '../../models/flour'
import { Update } from '../../models/update'

interface Props {
  selection: SelectionModel
  deleteSelection: (id: number) => void
  updateSelection: (update: Update) => void
}

export function Selection({
  selection,
  deleteSelection,
  updateSelection,
}: Props) {
  const removeSelection = () => {
    deleteSelection(selection.id)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)

    const updates: Update = {
      id: Number(selection.id),
      key: '',
      value: newValue,
    }

    switch (event.target.id) {
      case 'amount':
        updateSelection({
          ...updates,
          key: 'amount',
        })
        break

      case 'hydration':
        if (newValue !== selection.defaultHydration) {
          updateSelection({
            ...updates,
            key: 'alteredHydration',
          })
        } else {
          updateSelection({
            ...updates,
            key: 'defaultHydration',
          })
        }
    }
  }

  return (
    <tr>
      <td>
        <input
          className="flour-entry-name"
          type="text"
          value={selection.name}
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
          value={selection.amount}
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
          value={selection.alteredHydration || selection.defaultHydration}
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
