import request from "superagent"
import { Override } from "../../models/user"

export const putOverride = async (override: Override) => {
  const response = await request.post("/api/v1/overrides").send(override)
  return response.body
}

export const deleteOverride = async (override: Override) => {
  const response = await request.delete("/api/v1/overrides").send(override)
  return response.body
}
