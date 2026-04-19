import { Router } from "express"
import * as controller from "./auth.controller.js"
import validate from "../../common/middleware/validate.middleware.js"
import RegisterDto from "./dto/register.dto.js"
import { authenticate } from "./auth.middleware.js"
import LoginDto from "./dto/login.dto.js"
import ResetPasswordDto from "./dto/reset-password.dto.js"
import ForgotPasswordDto from "./dto/forgot-password.dto.js"

const router = Router()

router.post("/register", validate(RegisterDto) ,controller.register)
router.post("/login", validate(LoginDto), controller.login)
router.post("/logout", authenticate, controller.logout)
router.get("/verify-email/:token", controller.verifyEmail)
router.get("/forgot-password", validate(ForgotPasswordDto), controller.forgotPassword)
router.get("/reset-passord/:token", validate(ResetPasswordDto), controller.resetPassword)
router.get("/me", authenticate, controller.getMe)


export default router;