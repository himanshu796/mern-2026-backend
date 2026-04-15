import jwt from "jsonwebtoken"

export const generateCookie = (user, res, statusCode = 200, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 10 * 60 * 1000,        // expires in 10 minutes
        sameSite:
            process.env.NODE_ENV === "development" ? "lax" : "none",
        secure:
            process.env.NODE_ENV === "development" ? false : true
    }).json({
        success: true,
        message
    })
}