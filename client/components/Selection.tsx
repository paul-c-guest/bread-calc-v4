import { Update } from "../../models/update"
import { Flour, Selection as SelectionModel } from "../../models/flour"

interface Props {
  selection: SelectionModel
  available: Flour[]
  deleteSelection: (id: number) => void
  updateSelection: (update: Update) => void
}

export function Selection({
  available,
  selection,
  deleteSelection,
  updateSelection,
}: Props) {
  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newSelectionId = Number(event.target.value)
    const newSelection = available.find((flour) => flour.id === newSelectionId)

    if (newSelection) {
      updateSelection({
        id: newSelectionId,
        key: "flour",
        value: selection.amount,
        position: selection.position,
      })
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)

    const updates = {
      id: Number(selection.id),
      value: newValue,
    }

    switch (event.target.id) {
      case "amount":
        updateSelection({
          ...updates,
          key: "amount",
        })
        break

      case "hydration":
        if (newValue !== selection.defaultHydration) {
          updateSelection({
            ...updates,
            key: "alteredHydration",
          })
        } else {
          updateSelection({
            ...updates,
            key: "defaultHydration",
          })
        }
    }
  }

  const handleDelete = () => {
    deleteSelection(selection.id)
  }

  return (
    <tr>
      <td>
        <select
          className="new-selection"
          name="new-selection"
          id="flourId"
          onChange={handleSelectionChange}
          aria-label="flour selection"
        >
          <option value={selection.id}>{selection.name}</option>

          {available.map((flour) => (
            <option key={flour.id} value={flour.id}>
              {flour.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          className={selection.amount > 0 ? "" : "warning"}
          id="amount"
          onChange={handleChange}
          type="number"
          min={10}
          step={10}
          value={selection.amount.toString()}
          aria-label="flour amount in grams"
        />
      </td>
      <td>
        <input
          type="number"
          id="hydration"
          className={`flour-entry-number ${
            selection.alteredHydration == 0 ? "warning" : ""
          }`}
          onChange={handleChange}
          min={1}
          max={200}
          step={1}
          value={
            selection.alteredHydration?.toString() ||
            selection.defaultHydration.toString()
          }
          aria-label="hydration percentage"
        />
      </td>
      <td>
        <input
          type="button"
          className="flour-delete-button"
          value={"⨯"}
          onClick={handleDelete}
          aria-label="delete this selection"
        />
      </td>
    </tr>
  )
}
