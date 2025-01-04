import express from "express"
import { getUser, getUserById } from "../controllers/user.controller.js"

const router = express.Router()

router.get('/get-user', getUser)
router.get('/get-user/:id', getUserById)

export default router