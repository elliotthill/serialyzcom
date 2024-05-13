import express from "express"
import Router from "express-promise-router"
import {TestDrive, ViewTestDrive} from "../../controllers/test-drive.js"
const router = Router()

router.get("/", TestDrive)
router.get("/:id", ViewTestDrive)

export default router
