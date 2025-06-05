import express, { Router } from "express"
import categoryController from "../controllers/categoryController";
import userAuthentication, { Role } from "../middleware/isAuthenticate"

const router:Router = express.Router();

router.route("/")
.post( userAuthentication.isAuthenticated, userAuthentication.restrictTo(Role.Admin) ,categoryController.addCategory)
.get(categoryController.getCategory)

router.route("/:id")
.delete(userAuthentication.isAuthenticated, userAuthentication.restrictTo(Role.Admin) ,categoryController.deleteCategory)
.patch(userAuthentication.isAuthenticated, userAuthentication.restrictTo(Role.Admin) ,categoryController.updateCategory)

export default router;