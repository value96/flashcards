import { WordsListController } from "controllers"
import { Router } from "express"
import { isAuth } from "middlewares/isAuth"

const router = Router()

router.get("/words", isAuth, WordsListController.getWords)

export default router
