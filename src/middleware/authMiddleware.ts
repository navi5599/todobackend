import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import { AuthenticationError } from "./errorMiddleware"

const Models = require('../models/User')
const User = Models.User

const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.cookies.jwt

      if (!token) {
        res.status(401)
        throw new AuthenticationError('Token not found')
      }

      const jwtSecret = process.env.JWT_SECRET || ""
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload

      if (!decoded || !decoded.userId) {
        res.status(401)
        throw new AuthenticationError('User ID not found')
      }

      const user = await User.findById(decoded.userId, "_id name email")

      if (!user) {
        res.status(401)
        throw new AuthenticationError('User not found')
      }

      req.user = user
      next()
    } catch (e) {
      res.status(401)
      throw new AuthenticationError('Invalid token')
    }
  }
)

export { authenticate }