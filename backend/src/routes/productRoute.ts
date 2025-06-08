import express, { Router } from "express";
import ProductController from "../controllers/productController";
import UserAuthentication, { Role } from "../middleware/isAuthenticate";
import { storage , multer } from "../services/handleFile";
import errorHandler from "../services/errorHandler";

const router:Router = express.Router()

const upload = multer({storage : storage})

router.route("/")
.post(UserAuthentication.isAuthenticated , UserAuthentication.restrictTo(Role.Admin) ,upload.single("productImage"), errorHandler(ProductController.createProduct))
.get(errorHandler(ProductController.getAllProducts))

router.route("/:id")
.patch(UserAuthentication.isAuthenticated , UserAuthentication.restrictTo(Role.Admin) , errorHandler(ProductController.updateProduct))
.delete(UserAuthentication.isAuthenticated , UserAuthentication.restrictTo(Role.Admin) , errorHandler(ProductController.deleteProduct))
.get(errorHandler(ProductController.getSingleProduct))

export default router;