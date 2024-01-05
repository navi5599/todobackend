import express from "express"
import { registerUser, loginUser, logoutUser, getUser } from "../controllers/authController"
import { authenticate } from "../middleware/authMiddleware"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/auth", authenticate, getUser)


export default router