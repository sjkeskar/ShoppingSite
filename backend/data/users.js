import bcrypt from "bcryptjs";

const users = [
	{
		name: "Admin user",
		email: "admin@example.com",
		password: bcrypt.hashSync("qwerty", 10),
		isAdmin: true,
	},
	{
		name: "John Doe",
		email: "Jon@example.com",
		password: bcrypt.hashSync("qwerty", 10),
	},
	{
		name: "Jane Doe",
		email: "Jane@example.com",
		password: bcrypt.hashSync("qwerty", 10),
	},
];

export default users;
