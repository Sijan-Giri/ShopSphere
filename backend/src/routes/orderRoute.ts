import express from "express"
import UserAuthentication from "../middleware/isAuthenticate";
import errorHandler from "../services/errorHandler";
import OrderController from "../controllers/orderController";

const router = express.Router();

router.route("/")
.post(UserAuthentication.isAuthenticated,errorHandler(OrderController.createOrder))
.get(UserAuthentication.isAuthenticated,OrderController.fetchMyOrders);

router.route("/:id").get(UserAuthentication.isAuthenticated,OrderController.fetchMyOrderDetails)

router.route("/verify-transaction").post(UserAuthentication.isAuthenticated,errorHandler(OrderController.verifyTransaction))

export default router;