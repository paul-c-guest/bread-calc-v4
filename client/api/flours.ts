import request from "superagent"
import { Flour, FlourData } from "../../models/flour"

export const getDefaultFlours = async (): Promise<Flour[]> => {
  const response = await request.get("/api/v1/flours")
  return response.body
}

export const getFloursForOwner = async (token: string): Promise<Flour[]> => {
  const response = await request
    .get(`/api/v1/flours/owner`)
    .set("Authorization", `Bearer ${token}`)
  return response.body
}

export const getFlourById = async (id: number): Promise<Flour> => {
  const response = await request.get(`/api/v1/flours/flour/${id}`)
  return response.body
}

export const createFlour = async (
  newFlour: FlourData,
  token: string,
): Promise<Flour> => {
  const response = await request
    .post("/api/v1/flours")
    .set("Authorization", `Bearer ${token}`)
    .send(newFlour)
  return response.body
}

export const updateFlour = async (
  update: (Flour | string)[]
): Promise<Flour> => {
  const [flour, token] = update
  const response = await request
    .put("/api/v1/flours")
    .set("Authorization", `Bearer ${token}`)
    .send(flour)
  return response.body
}

// called from a useMutation which will only accept one arg
export const deleteFlour = async (
  target: (string | number)[],
): Promise<Flour> => {
  const [id, token] = target
  const response = await request
    .delete(`/api/v1/flours/${id}`)
    .set("Authorization", `Bearer ${token}`)
  return response.body
}
