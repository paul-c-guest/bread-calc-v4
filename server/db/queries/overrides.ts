import connection from "../connection"
import { Override } from "../../../models/user"

export const putOverride = (override: Override): Promise<Override> => {
  return connection("overrides").insert({ ...override })
}

// sub is the auth0 sub property
export const getOverridesForUser = (sub: string): Promise<Override[]> => {
  return connection("overrides").where({ userAuth0Sub: sub })
}

export const deleteOverride = (override: Override): Promise<Override> => {
  return connection("overrides").where({ flourId: override.flourId }).delete()
}
