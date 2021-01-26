import express from "express";
const router = express.Router();
import {
	addOrderItems,
	getMyOrders,
	getOrderItems,
	getOrders,
	updateOrderToDelivered,
	updateOrdertoPaid,
} from "../controller/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderItems);
router.route("/:id/pay").put(protect, updateOrdertoPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
