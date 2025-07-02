import express from "express"
import UserAuthentication, { Role } from "../middleware/isAuthenticate";
import errorHandler from "../services/errorHandler";
import OrderController from "../controllers/orderController";

const router = express.Router();

router.route("/")
.post(UserAuthentication.isAuthenticated,errorHandler(OrderController.createOrder))
.get(UserAuthentication.isAuthenticated,OrderController.fetchMyOrders);

router.route("/verify-transaction")
.post(UserAuthentication.isAuthenticated,errorHandler(OrderController.verifyTransaction))

router.route("/:id")    
.get(UserAuthentication.isAuthenticated,OrderController.fetchMyOrderDetails)

router.route("/cancel-order/:id")
.post(UserAuthentication.isAuthenticated,errorHandler(OrderController.cancelOrder))

router.route("/delete-order/:id")
.delete(UserAuthentication.isAuthenticated,UserAuthentication.restrictTo(Role.Admin),OrderController.deleteOrder)

router.route("/change-status/:id")
.post(UserAuthentication.isAuthenticated,UserAuthentication.restrictTo(Role.Admin),errorHandler(OrderController.changeOrderStatus))

export default router;