import connection from "../connection"
import { Override } from "../../../models/user"

export const getOverridesForOwner = (owner: string): Promise<Override[]> => {
  return connection("overrides").where({ owner })
}

export const createOverride = (override: Override): Promise<Override> => {
  return connection("overrides").insert({ ...override })
}

export const updateOverride = (override: Override): Promise<Override> => {
  return connection("overrides")
    .where({ flourId: override.flourId, owner: override.owner })
    .update({ ...override })
}

export const deleteOverride = (override: Override): Promise<Override> => {
  return connection("overrides")
    .where({ flourId: override.flourId, owner: override.owner })
    .delete()
}
