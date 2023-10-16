import { Flour, Selection } from "../../models/flour"

interface Props {
  flours: Flour[]
  available: Flour[]
  selections: Record<number, Selection>
  addNewSelection: (selection: Selection) => void
}

export function NewSelection({
  available,
  flours,
  selections,
  addNewSelection,
}: Props) {
  const getNextPosition = () => {
    return (
      Object.values(selections)
        .map((sel) => sel.position)
        .reduce(
          (previous, current) => (current > previous ? current : previous),
          1,
        ) + 1
    )
  }

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const flour = flours.find(
      (flour) => flour.id === Number(event.target.value),
    )

    const newSelection = {
      ...flour,
      position: getNextPosition(),
      amount: 100,
      flourId: flour!.id,
    } as Selection

    addNewSelection(newSelection)
  }

  return (
    available && (
      <tr>
        <td>
          <select
            name="new-selection"
            className="new-selection"
            id="flourId"
            onChange={handleSelectionChange}
          >
            <option value={undefined}>Add flour...</option>
            {available.map((flour) => (
              <option key={flour.id} value={flour.id}>
                {flour.name}
              </option>
            ))}
          </select>
        </td>
      </tr>
    )
  )
}
