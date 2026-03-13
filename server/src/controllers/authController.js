import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/userModel.js"; // Nhập các hàm từ models để sử dụng trong đây
import dotenv from "dotenv";

dotenv.config();

// JWT secret; keep it in env for production
const JWT_SECRET = process.env.JWT_SECRET;


export const students = async (req, res) => { // Khai báo controller
	try {

		const { id } = req.params;

		if (!id) {
			return res.status(400).json({
				message: "Student id required"
			});
		}

		res.json({
			id,
			name: `Student ${id}`
		});

	} catch (error) {

		res.status(500).json({
			message: "Server error"
		});

	}

};


export const register = async (req, res) => {
	const { email, password, confirmPassword } = req.body;

	const exist = findUserByEmail(email);
	if (exist)
		return res.status(400).json({
			message: "User exists",
		});
	else if (password !== confirmPassword) {
		return res.status(400).json({
			message: "Passwords don't match"
		});
	}

	const hashed = await bcrypt.hash(password, 10); // Hash mật khẩu

	createUser({
		email,
		password: hashed,
	});

	res.json({
		message: "Registered"
	});
};

export const login = async (req, res) => {
	try {

		const { email, password } = req.body;

		// 1. Validate input
		if (!email || !password) {
			return res.status(400).json({
				message: "Email and password are required",
			});
		}

		// 2. Tìm user
		const user = await findUserByEmail(email);

		if (!user) {
			return res.status(401).json({
				message: "Invalid email or password",
			});
		}

		// 3. So sánh mật khẩu
		const valid = await bcrypt.compare(password, user.password);

		if (!valid) {
			return res.status(401).json({
				message: "Invalid email or password",
			});
		}

		// 4. Tạo JWT
		const token = jwt.sign(
			{ id: user.id, email: user.email },
			JWT_SECRET,
			{ expiresIn: "1h" }
		);

		// 5. Response
		res.json({ token });

	} catch (error) {

		console.error(error);

		res.status(500).json({
			message: "Internal server error",
		});
	}
};

