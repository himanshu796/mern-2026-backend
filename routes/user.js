import express from "express"
import { userRegister, userLogin, logout, getMyProfile } from "../controllers/user.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()

router.post("/register", userRegister)

router.post("/login", userLogin)

router.get("/logout", logout)

router.get("/myprofile", isAuthenticated, getMyProfile)

export default router