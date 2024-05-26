import Router from "express-promise-router"
const router = Router()

import {JobRequest} from "../../../controllers/job.js"

router.get("/", JobRequest)

export default router
