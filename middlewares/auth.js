import { User } from "../models/user.js"
import jwt from "jsonwebtoken"


export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies

        if (!token) return res.status(401).json({
            success: false,
            message: "Please Login..."
        })

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decode._id)

        if (!req.user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}