import jwt from "jsonwebtoken"

export const generateCookie = (user, res, statusCode = 200, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

    // console.log(token)

    res.status(201).cookie("token", token, {
        httpOnly: true,
        maxAge: 10 * 60 * 1000,        // expires in 10 minutes
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    }).json({
        success: true,
        message
    })
}