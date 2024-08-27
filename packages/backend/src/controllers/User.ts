import { Request, Response } from "express"
import { UserSql } from "../models"
import { UserView } from "../views"

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserSql.findAll()
    res.json(UserView.formatUsers(users))
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
