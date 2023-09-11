import request from "superagent"
import { User } from "../../models/user"

export const getUserById = async (id: number): Promise<User> => {
  const response = await request.get(`/api/v1/users/${id}`)
  console.log(response.body)
  return response.body
}
