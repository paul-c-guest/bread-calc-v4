import { Selection } from '../models/flour'

interface Props {
  selections: Selection[]
}

export function Selections({ selections }: Props) {
  return (
    <>
      <details>
        <summary><h2>My Selections</h2></summary>
        {selections.map((sel) => {
          return (
            <p key={sel.name}>
              {sel.name}: {sel.amount}g @{' '}
              {sel.alteredHydration
                ? sel.alteredHydration
                : sel.defaultHydration}
              %
            </p>
          )
        })}
      </details>
      <hr />
    </>
  )
}
