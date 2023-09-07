import User from "../model/userModel.js";
import jwt from 'jsonwebtoken'
import asyncHandler from "./asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;
    //get token from cookie
    token = req.cookies.jwt
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('User not authorized, token expired')
        }
    }else{
        res.status(401)
        throw new Error('User not authorized, no token has found')
    }
})

//admin middleware

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
    next()
    }else{
        res.status(401);
        throw new Error('Not Authrized as an admin')
    }
}

export { protect, admin }
