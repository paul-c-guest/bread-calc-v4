import request from "superagent"
import { Override } from "../../models/user"

export const getOverridesForOwner = async (
  token: string,
): Promise<Override[]> => {
  const response = await request
    .get("/api/v1/overrides/owner")
    .set("Authorization", `Bearer ${token}`)

  return response.body
}

export const createOverride = async (override: Override): Promise<Override> => {
  const response = await request.post("/api/v1/overrides").send(override)
  return response.body
}

export const updateOverride = async (override: Override): Promise<Override> => {
  const response = await request.put("/api/v1/overrides").send(override)
  return response.body
}

export const deleteOverride = async (override: Override): Promise<Override> => {
  const response = await request.delete("/api/v1/overrides").send(override)
  return response.body
}
