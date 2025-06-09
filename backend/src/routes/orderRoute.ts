import express from "express"
import UserAuthentication from "../middleware/isAuthenticate";
import errorHandler from "../services/errorHandler";
import OrderController from "../controllers/orderController";

const router = express.Router();

router.route("/").post(UserAuthentication.isAuthenticated,errorHandler(OrderController.createOrder))

export default router;