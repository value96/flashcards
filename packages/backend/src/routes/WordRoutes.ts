import { Router } from "express"
import { WordController } from "../controllers/index"

const router = Router()

router.get("/:count", WordController.getSome)
router.post("/forgotten-word", WordController.acceptForgottenWord)
router.post("/repeated-word", WordController.acceptRepeatedWord)
export default router
