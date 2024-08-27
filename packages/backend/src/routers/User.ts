import { Router } from "express"
import { UserController } from "../controllers/index"
import { isAuth } from "../middlewares/isAuth"

const router = Router()

router.get("/", isAuth, UserController.getUsers)
//router.post("/", isAuth, UserController.createUser)

export default router
