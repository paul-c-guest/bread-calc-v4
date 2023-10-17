import connection from "../connection"
import { User } from "../../../models/user"

export const getUserByAuth = (sub: string): Promise<User> => {
  return connection("users").where({ auth0id: sub }).first()
}
