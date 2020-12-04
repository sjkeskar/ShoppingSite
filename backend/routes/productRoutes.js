import express from "express";
const router = express.Router();
import {
	getProducts,
	getProductbyID,
} from "../controller/productController.js";

router.route("/").get(getProducts);
router.route("/:id").get(getProductbyID);

export default router;
