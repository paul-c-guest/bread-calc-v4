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
    const selectedId = Number(event.target.value)
    const selectionChange = available.find((flour) => flour.id === selectedId)

    // return value of selectionChange will be 'undefined' if no change
    if (selectionChange) {
      updateSelection({
        id: selectedId,
        type: "flour",
        value: selection.amount,
        position: selection.position,
      })
    }
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)

    const updates = {
      id: Number(selection.id),
      value: newValue,
    }

    switch (event.target.id) {
      case "amount":
        updateSelection({
          ...updates,
          type: "amount",
        })
        break

      case "hydration":
        if (newValue !== selection.defaultHydration) {
          updateSelection({
            ...updates,
            type: "alteredHydration",
          })
        } else {
          updateSelection({
            ...updates,
            type: "defaultHydration",
          })
        }
        break
    }
  }

  const handleDelete = () => deleteSelection(selection.id)

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
          onChange={handleValueChange}
          type="number"
          min={10}
          step={10}
          value={selection.amount.toString()}
          aria-label="flour amount in grams"
        />
      </td>
      <td>
        <input
          readOnly
          type="number"
          id="hydration"
          className={`flour-entry-number ${
            selection.alteredHydration == 0 ? "warning" : ""
          }`}
          onChange={handleValueChange}
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
