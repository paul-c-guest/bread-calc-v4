import connection from "../connection"
import { Flour, FlourData } from "../../../models/flour"

// returned for unauthed visitors
export const getDefaultFlours = (): Promise<Flour[]> => {
  return connection("flours").select().whereNull("owner")
}

// authed users get the default set plus any that they have created
export const getAllFloursForOwner = (owner: string): Promise<Flour[]> => {
  return connection.union([
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
