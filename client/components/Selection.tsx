import { Update } from '../../models/update'
import { Selection as SelectionModel } from '../../models/flour'

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
          aria-label="flour type"
          readOnly
        />
      </td>
      <td>
        <input
          className={
            selection.amount > 0
              ? 'flour-entry-number'
              : 'flour-entry-number warning'
          }
          id="amount"
          onChange={handleChange}
          type="number"
          min={0}
          step={10}
          value={selection.amount}
          aria-label="flour amount in grams"
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
          aria-label="hydration percentage"
        />
      </td>
      <td>
        <button
          className="flour-delete-button"
          onClick={removeSelection}
          aria-label="delete this selection"
        ></button>
      </td>
    </tr>
  )
}
