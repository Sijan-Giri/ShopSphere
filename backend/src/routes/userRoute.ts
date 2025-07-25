import express, { Router } from "express";
import UserController from "../controllers/userController";
import UserAuthentication, { Role } from "../middleware/isAuthenticate";

const router:Router = express.Router();

router.route("/users")
.get(UserAuthentication.isAuthenticated,UserAuthentication.restrictTo(Role.Admin),UserController.fetchAllUsers)

router.route("/users/:id")
.delete(UserAuthentication.isAuthenticated,UserAuthentication.restrictTo(Role.Admin),UserController.deleteUser)
router.route("/register").post(UserController.register)
router.route("/login").post(UserController.login)
router.route("/forget-password").post(UserController.forgetPassword)
router.route("/verify-otp").post(UserController.verifyOtp)
router.route("/reset-password").post(UserController.resetPassword)

export default router