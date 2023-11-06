import { Flour } from "../../models/flour"
import { Override } from "../../models/user"

export const applyOverridesToSortedFlours = (
  flours: Flour[] | undefined,
  overrides: Override[] | undefined,
): Flour[] => {
  let result: Flour[] = []

  if (!flours) return result

  // sort flours so owner's flours appear first, followed by default flours - there will be two sections, each sorted alphabetically
  result = flours
    .sort(
      (a, b) =>
        b.name.toLowerCase().charCodeAt(0) - a.name.toLowerCase().charCodeAt(0),
    )
    .sort((a, b) => (a.owner === null && b.owner !== null ? 1 : -1))

  if (!overrides) return result

  // make a map using flour ids as keys to cut down brute searching in next array.map step
  const orMap = new Map<number, Override>()
  overrides.forEach((or) => orMap.set(or.flourId, or))

  // if an override exists for a flour, update the flours properties where relevant
  result = result.map((flour) =>
    orMap.has(flour.id)
      ? {
          ...flour,
          name: orMap.get(flour.id)?.name ?? flour.name,
          alteredHydration: orMap.get(flour.id)?.hydration ?? undefined,
          owner: null,
        }
      : flour,
  )

  return result
}
