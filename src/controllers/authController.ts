import { Request, Response } from "express"
import { IUser } from "../models/User"
import { clearToken, generateToken } from "../utils/auth"

const Models = require('../models/User')
const User = Models.User

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400).json({ message: "The user already exists" })
  }

  const user: IUser = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400).json({ message: "An error occurred in creating the user" })
  }
}

const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  const comparedPassword = await user?.comparePassword(password)

  if (user && comparedPassword) {
    generateToken(res, user._id)
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(401).json({ message: "User not found / password incorrect" })
  }
}

const logoutUser = (req: Request, res: Response) => {
  clearToken(res)
  res.status(200).json({ message: "User logged out" })
}

export { registerUser, authenticateUser, logoutUser }