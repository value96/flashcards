import { Router } from "express"
import { DisplayedWordsController } from "../controllers/index"
import { isAuth } from "../middlewares/isAuth"

const router = Router()

router.get("/:count", isAuth, DisplayedWordsController.getSome)
router.post(
  "/forgotten-word",
  isAuth,
  DisplayedWordsController.acceptForgottenWord,
)
router.post(
  "/repeated-word",
  isAuth,
  DisplayedWordsController.acceptRepeatedWord,
)
export default router
