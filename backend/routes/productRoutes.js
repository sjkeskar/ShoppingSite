import express from "express";
const router = express.Router();
import {
	getProducts,
	getProductbyID,
	createProduct,
	createProductReview,
	getTopProducts,
	deleteProduct,
	updateProduct,
} from "../controller/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);
router
	.route("/:id")
	.get(getProductbyID)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct);

export default router;
