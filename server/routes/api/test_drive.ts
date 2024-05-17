import express, { Request, Response, NextFunction } from "express"
import Router from "express-promise-router"
import { models, sequelize } from "../../models/index.js"
import { Job } from "../../models/job.js"
import { QueryTypes } from "sequelize"
const router = Router()
import config from "./config.json" assert {type: "json"}

router.post("/", async function(req: Request, res: Response) {
    const url: string = req.body.url
    const jobId = await models.Job.create({ url: url })

    let pollTime = 0

    //Wait until job completes
    const poll = async () => {
        pollTime += config.TRY_POLLTIME_MS
        if (pollTime > config.TRY_TIMEOUT_MS) {
            res.status(500).send()
        }

        let job = await sequelize.query<Job>(
            `
        SELECT id, url, status, structure
        FROM job
        WHERE (status='complete' OR status='error') AND id=:id
        `,
            {
                type: QueryTypes.SELECT,
                replacements: { id: jobId.id },
                plain: true
            }
        )

        if (job) res.json(job)
        else setTimeout(poll, config.TRY_POLLTIME_MS)
    }

    setTimeout(poll, config.TRY_START_POLL_MS)
})

import { TestDrives } from "../../services/test-drives.js"
const testDrives = new TestDrives(sequelize)

router.get("/latest-test-drives", async function(req: Request, res: Response) {
    const testDriveData = await testDrives.getLatest()
    res.json(testDriveData).send()
})

router.get("/:id", async function(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) {
        res.status(500).send()
        return
    }
    console.log(id)
    const testDriveData = await testDrives.getOne(id)
    res.json(testDriveData).send()
})

export default router
