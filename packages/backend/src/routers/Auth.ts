import { Router } from "express"
import { AuthController } from "../controllers"
import { AuthValidators, handleValidationErrors } from "../validators"
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
