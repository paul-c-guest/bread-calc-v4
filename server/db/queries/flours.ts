import connection from "../connection"
import { Flour, FlourData } from "../../../models/flour"

/**
 * @deprecated in favour of only allowing getAllFloursForOwner
 */
export const getAllFlours = (): Promise<Flour[]> => {
  return connection("flours").select()
}

export const getAllFloursForOwner = (owner: string): Promise<Flour[]> => {
  return connection
    .select()
    .union([
      connection("flours").where({ owner }),
      connection("flours").whereNull("owner"),
    ])
}

export const getFlourById = (id: number): Promise<Flour> => {
  return connection("flours").where({ id }).first()
}

export const putFlour = (newFlour: FlourData): Promise<Flour> => {
  return connection("flours").insert(newFlour)
}

export const deleteFlour = (id: number): Promise<Flour> => {
  return connection("flours").where({ id }).delete()
}
