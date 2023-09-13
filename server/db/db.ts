import connection from "./connection"
import { Flour, FlourData, Selections } from "../../models/flour"
import { Override, User } from "../../models/user"

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

export const putOverride = (override: Override): Promise<Override> => {
  return connection("overrides").insert({ ...override })
}

export const getOverridesForUser = (id: number): Promise<Override[]> => {
  return connection("overrides").where({ userId: id })
}

export const deleteOverride = (override: Override): Promise<Override> => {
  return connection("overrides").where({ flourId: override.flourId }).delete()
}

export const getUserByAuth = (sub: string): Promise<User> => {
  return connection("users").where({ auth0id: sub }).first()
}

export const deleteFlour = (id: number): Promise<Flour> => {
  return connection('flours').where({id}).delete()
}