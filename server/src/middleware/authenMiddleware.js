import jwt from "jsonwebtoken";

// keep the secret consistent with auth controller
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {

    console.log("Auth middleware running");

    const authHeader = req.headers.authorization;
    console.log("Authorization:", authHeader);

    if (!authHeader) {
        return res.status(401).json({
            message: "No token"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token,"
        });

    }

};