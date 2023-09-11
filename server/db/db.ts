import connection from "./connection"
import { Flour, FlourData, Selections } from "../../models/flour"

export const getAllFlours = (): Promise<Selections> => {
  return connection("flours").select()
}

export const getFlourById = (id: number): Promise<Flour> => {
  return connection("flours").where({ id }).first()
}

export const putFlour = (newFlour: FlourData): Promise<Flour> => {
  return connection("flours").insert({ newFlour })
}
