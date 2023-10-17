import connection from "../connection"
import { Override } from "../../../models/user"

export const putOverride = (override: Override): Promise<Override> => {
  return connection("overrides").insert({ ...override })
}

export const getOverridesForUser = (id: number): Promise<Override[]> => {
  return connection("overrides").where({ userId: id })
}

export const deleteOverride = (override: Override): Promise<Override> => {
  return connection("overrides").where({ flourId: override.flourId }).delete()
}
