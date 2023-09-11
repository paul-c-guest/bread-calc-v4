import request from "superagent"
import { Flour } from "../../models/flour"

export const getFlours = async (): Promise<Flour[]> => {
  const response = await request.get("/api/v1/flours")
  return response.body
}

export const getFlourById = async (id: number): Promise<Flour> => {
  const response = await request.get(`/api/v1/flours/${id}`)
  return response.body
}
