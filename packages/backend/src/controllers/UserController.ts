import { Request, Response } from "express"
import User from "../models/sql/User"
import { formatUser, formatUsers } from "../views/UserView"

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll()
    res.json(formatUsers(users))
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" })
  }
}

/* export const createUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, passwordHash, avatarUrl } = req.body
    const user = await User.create({
      fullName,
      email,
      passwordHash,
      avatarUrl,
    })
    res.status(201).json(formatUser(user))
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" })
  }
}
 */
