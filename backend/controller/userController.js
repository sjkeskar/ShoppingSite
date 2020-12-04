import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc     Auth user & get token
//@route    POST /api/users/login
//@access   Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid Email or Password");
	}
});

//@desc     Register new user
//@route    POST /api/users
//@access   Public
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const userExist = await User.findOne({ email });
	if (userExist) {
		res.status(400);
		throw new Error("User already Exists");
	}
	const user = await User.create({
		name,
		email,
		password,
	});
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid User data");
	}
});

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   Private
export const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.password = req.body.password || user.password;

		const updatesUser = await user.save();
		res.json({
			_id: updatesUser._id,
			name: updatesUser.name,
			email: updatesUser.email,
			isAdmin: updatesUser.isAdmin,
			token: generateToken(updatesUser._id),
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});
