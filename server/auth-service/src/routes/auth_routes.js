import express from "express";
import {register} from "../controllers/auth_register.js";
import {verifyOTP} from '../controllers/auth_verify_OTP.js'
import {setPassword} from '../controllers/auth_set_password.js'
import {login} from '../controllers/auth_login.js'

const router = express.Router();

// 🔐 Auth Routes
router.post("/register", register);         // Send OTP
router.post("/verify-otp", verifyOTP);     // Verify OTP
router.post("/set-password", setPassword); // Complete registration
router.post("/login", login);              // Login user

export default router;