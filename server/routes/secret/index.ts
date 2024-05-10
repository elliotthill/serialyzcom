import {Request, Response} from "express"

import Router from "express-promise-router"
import {sequelize} from "../../models/index.js"
import {QueryTypes} from "sequelize"
import {Job} from "../../models/job.js"

const router = Router()

/*
 * These paths will need to be protected by a key
 */

router.get("/", async (req: Request, res: Response) => {
    const job = await sequelize.query<Job>(
        `
    SELECT id, url
    FROM job
    WHERE status='requested'
    ORDER BY requested ASC
    `,
        {type: QueryTypes.SELECT, plain: true}
    )

    res.json(job)

    if (!job) {
        return
    }

    //We've now passed that job to them
    await sequelize.query(
        `
    UPDATE job
    SET status=:status
    WHERE id=:id
    `,
        {
            type: QueryTypes.UPDATE,
            replacements: {
                id: job.id,
                status: "processing"
            }
        }
    )
})

router.post("/:jobId/return", async (req: Request, res: Response) => {
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
