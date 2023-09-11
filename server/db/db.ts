import connection from "./connection"
import { Flour, Selections } from "../../models/flour"

export const getAllFlours = (): Promise<Selections> => {
  return connection("flours").select()
}

export const getFlourById = (id: number): Promise<Flour> => {
  return connection("flours").where({ id }).first()
}
