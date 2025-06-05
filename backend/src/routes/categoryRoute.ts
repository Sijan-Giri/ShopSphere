import express, { Router } from "express"
import categoryController from "../controllers/categoryController";
import UserAuthentication from "../middleware/isAuthenticate"

const router:Router = express.Router();

router.route("/")
.post( UserAuthentication.isAuthenticated,categoryController.addCategory)
.get(categoryController.getCategory)

router.route("/:id")
.delete(categoryController.deleteCategory)
.patch(categoryController.updateCategory)

export default router