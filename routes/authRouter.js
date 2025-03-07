import { Router } from "express";
import { register, login, logout, resetPassword } from "../controllers/authController.js";
const router = Router();

import {
  validateRegisterInput,
  validateLoginInput,
  validateResetPasswordUserInput,
} from "../middleware/validationMiddleware.js";

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.post("/reset", validateResetPasswordUserInput, resetPassword);
router.get("/logout", logout);

export default router;
