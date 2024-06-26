import express from "express"
//const router = express.Router();
import Router from "express-promise-router"
const router = Router()

import {Index} from "../controllers/index.js"
import {Login, Register, Logout} from "../controllers/auth.js"

/* GET home page. */
router.get("/", Index)

router.get("/login", Login)
router.get("/register", Register)
router.get("/logout", Logout)
export default router
