import { useState } from 'react'
import { Flour, Selection } from '../models/flour'

interface Props {
  flours: Flour[]
  setSelections: React.Dispatch<React.SetStateAction<Selection[]>>
}

export function NewSelection({ flours, setSelections }: Props) {
  const [editing, setEditing] = useState(false)
  console.log(editing)

  return editing ? (
    <>
      <select name="new-selection" id="new-selection">
        {flours.map((flour) => (
          <option value={flour.name}>{flour.name}</option>
        ))}
        <option value=""></option>
      </select>
    </>
  ) : (
    <>
      <button onClick={() => setEditing(true)}>Add Selection</button>
    </>
  )
}
