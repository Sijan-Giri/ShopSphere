import express from "express"
import UserAuthentication, { Role } from "../middleware/isAuthenticate";
import CartController from "../controllers/cartController";

const router = express.Router();

router.route("/")
.post(UserAuthentication.isAuthenticated,CartController.addToCart)
.get(UserAuthentication.isAuthenticated,CartController.getMyCartItems)
.get(UserAuthentication.isAuthenticated,UserAuthentication.restrictTo(Role.Admin),CartController.getAllCarts)

router.route('/:productId')
.delete(UserAuthentication.isAuthenticated,CartController.deleteMyCart)
.patch(UserAuthentication.isAuthenticated,CartController.updateCartItem)

export default router;