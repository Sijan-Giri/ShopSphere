import express, { Router } from "express";
import ProductController from "../controllers/productController";
import UserAuthentication, { Role } from "../middleware/isAuthenticate";
import { storage , multer } from "../services/handleFile";

const router:Router = express.Router()

const upload = multer({storage : storage})

router.route("/")
.post(UserAuthentication.isAuthenticated , UserAuthentication.restrictTo(Role.Admin) ,upload.single("productImage"), ProductController.createProduct)
.get(ProductController.getAllProducts)

router.route("/:id")
.patch(UserAuthentication.isAuthenticated , UserAuthentication.restrictTo(Role.Admin) , ProductController.updateProduct)
.delete(UserAuthentication.isAuthenticated , UserAuthentication.restrictTo(Role.Admin) , ProductController.deleteProduct)
.get(ProductController.getSingleProduct)

export default router;