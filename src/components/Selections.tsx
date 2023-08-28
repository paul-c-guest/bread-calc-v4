import { Selection } from '../models/flour'

interface Props {
  selections: Selection[]
}

export function Selections({ selections }: Props) {
  return (
    <>
      <h2>My Selections</h2>
      {selections.map((sel) => {
        return (
          <p key={sel.name}>
            {sel.name}: {sel.amount}g @{' '}
            {sel.alteredHydration ? sel.alteredHydration : sel.defaultHydration}%
          </p>
        )
      })}
      <hr />
    </>
  )
}
