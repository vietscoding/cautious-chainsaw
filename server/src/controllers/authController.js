import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/userModel.js";

export const register = async (req, res) => {
	const { email, password } = req.body;

	const exist = findUserByEmail(email);
	if (exist)
		return res.status(400).json({
			message: "User exists",
		});

	const hashed = await bcrypt.hash(password, 10); // Hash mật khẩu

	createUser({
		email,
		password: hashed,
	});

	res.json({ message: "Registered" });
};


export const login = async (req, res) => {

	// 
	const { email, password } = req.body;

	const user = findUserByEmail(email);

	if (!user)
		return res.status(404).json({
			message: "User not found",
		});

	const valid = await bcrypt.compare(
		password,
		user.password
	);

	if (!valid)
		return res.status(401).json({
			message: "Wrong password",
		});

	const token = jwt.sign(
		{ email },
		"SECRET_KEY",
		{ expiresIn: "1h" }
	);

	res.json({ token });
};