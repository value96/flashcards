import { Router } from "express"
import { AuthController } from "../controllers/index"
import { AuthValidators, handleValidationErrors } from "../validators/index"
import { isAuth } from "../middlewares/isAuth"

const router = Router()

/* router.post(
  "/sign-up",
  AuthValidators.signUp,
  handleValidationErrors,
  AuthController.signUp,
) */
router.post(
  "/sign-in",
  AuthValidators.signIn,
  handleValidationErrors,
  AuthController.signIn,
)

router.post("/logout", isAuth, AuthController.logout)

router.get("/refresh-token", AuthController.refreshToken)

export default router
