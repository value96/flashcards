import { Router } from "express"
import { WordController } from "../controllers/index"
import { isAuth } from "../middlewares/isAuth"

const router = Router()

router.get("/:count", isAuth, WordController.getSome)
router.post("/forgotten-word", isAuth, WordController.acceptForgottenWord)
router.post("/repeated-word", isAuth, WordController.acceptRepeatedWord)
export default router
