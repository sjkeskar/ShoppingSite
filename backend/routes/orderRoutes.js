import express from "express";
const router = express.Router();
import { addOrderItems, getMyOrders, getOrderItems, updateOrdertoPaid } from "../controller/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderItems);
router.route("/:id/pay").put(protect, updateOrdertoPaid);


export default router;
