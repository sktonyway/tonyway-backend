import jwt from 'jsonwebtoken'
import User from '../utils/userSchema.js'
import { asyncHandler } from '../utils/AsyncHandlers.js'
import ApiError from '../utils/ApiError.js'

// It sets req.user to userId or sends to last Error Handler
const reqUserId = asyncHandler((req, res, next) => {
    let token;
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    if (!token) {
        return next(ApiError.unAuthorised("Invalid Token"))
    }
    try {
        const decoded = jwt.verify(token, process.env.jwt_secret)
        req.user = decoded.id;
        console.log(req.user)
        next();
    } catch (error) {
        if (err.name === 'TokenExpiredError') {
            return next(ApiError.unAuthorised("Session expired, please login again"));
        }
        return next(ApiError.unAuthorised("Invalid Token"));
    }

})
export {reqUserId};