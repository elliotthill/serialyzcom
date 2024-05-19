import {Request, Response} from "express"

import Router from "express-promise-router"
import {sequelize} from "../../../models/index.js"
import {QueryTypes} from "sequelize"
import {Job} from "../../../models/job.js"

const router = Router()

const authenticate = (req: Request): boolean => {
    if (!req.headers.key || req.headers.key !== process.env.API_POLL_KEY) {
        return false
    }
    return true
}

/*
 * These paths will need to be protected by a key
 */

router.get("/", async (req: Request, res: Response) => {
    if (!authenticate(req)) {
        res.status(402).send()
        return
    }

    /// Select the next job AND marks it as processing in a transactional way
    /// this is to avoid passing the same job to multiple workers
    const job = await sequelize.query<Job>(
        `
        UPDATE job SET status='processing'
        WHERE id IN (
            SELECT id FROM (
                SELECT id
                FROM job
                WHERE status='requested'
                ORDER BY requested ASC
                LIMIT 1
            ) tmp
        )
        RETURNING id, url
        `,
        {type: QueryTypes.SELECT, plain: true}
    )
    res.json(job)
})

router.post("/:jobId/return", async (req: Request, res: Response) => {
    if (!authenticate(req)) {
        res.status(402).send()
        return
    }

    const jobId = req.params.jobId
    const json = JSON.stringify(req.body)

    if (req.body.status && req.body.status === "error") {
        await sequelize.query(`UPDATE job SET status='error', completed=NOW() WHERE id=:id`, {
            type: QueryTypes.UPDATE,
            replacements: {
                id: jobId
            }
        })
        res.json({status: "success"})
        return
    }

    await sequelize.query(`UPDATE job SET structure=:structure, status='complete', completed=NOW() WHERE id=:id`, {
        type: QueryTypes.UPDATE,
        replacements: {
            id: jobId,
            structure: json
        }
    })

    res.json({status: "success"})
})

export default router
