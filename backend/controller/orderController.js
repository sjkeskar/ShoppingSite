import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//@desc     Create new order
//@route    POST /api/orders
//@access   Private
export const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error("No order Items");
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			isDelivered: false,
		});
		const created = await order.save();
		res.status(200).json(created);
	}
});

//@desc     Get order by ID
//@route    GET /api/orders/:id
//@access   Private
export const getOrderItems = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);
	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

//@desc     Update order to Paid
//@route    GET /api/orders/:id/pay
//@access   Private
export const updateOrdertoPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		const updateOrder = await order.save();
		res.json(updateOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate("user", "id name");
	res.json(orders);
});

//@desc     Get logged in user orders
//@route    GET /api/orders/myorders
//@access   Private
export const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.json(orders);
});
