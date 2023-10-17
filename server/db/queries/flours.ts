import connection from "../connection"
import { Flour, FlourData, Selections } from "../../../models/flour"

export const getAllFlours = (): Promise<Selections> => {
  return connection("flours").select()
}

export const getFlourById = (id: number): Promise<Flour> => {
  return connection("flours").where({ id }).first()
}

export const putFlour = (newFlour: FlourData): Promise<Flour> => {
  console.log("newFlour", newFlour)
  return connection("flours").insert(newFlour)
}

export const deleteFlour = (id: number): Promise<Flour> => {
  return connection("flours").where({ id }).delete()
}
