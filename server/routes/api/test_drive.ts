import Router from "express-promise-router"
const router = Router()
import {TestDriveToken, RequestTestDrive, LatestTestDrives, GetSingle} from "server/controllers/test-drive.js"

router.post("/", RequestTestDrive)

router.get("/latest-test-drives", LatestTestDrives)

router.get("/:id", GetSingle)

export default router
