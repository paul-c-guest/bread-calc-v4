import request from "superagent"
import { Override } from "../../models/user"

export const getOverridesForUserId = async (id: number) => {
  const response = await request.get(`/api/v1/overrides/${id}`)  
  return response.body
}

export const putOverride = async (override: Override) => {
  const response = await request.post("/api/v1/overrides").send(override)
  return response.body
}

export const deleteOverride = async (override: Override) => {
  const response = await request.delete("/api/v1/overrides").send(override)
  return response.body
}
