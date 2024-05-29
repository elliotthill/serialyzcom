import {Request, Response} from "express"
import {URL, URLSearchParams} from "node:url"

import {models, sequelize} from "../models/index.js"
import {Job} from "../models/job.js"
import {QueryTypes} from "sequelize"

import config from "./config.json" assert {type: "json"}

export const JobRequest = async (req: Request, res: Response) => {
    if (!req.query.url || typeof req.query.url !== "string") {
        res.status(500).send({status: "error", error: "Please provide a URL with the parameter ?url="})
        return
    }

    /*
     * This entire logic needs to be a service class so we can unit test it
     * also we should allow POST requests to call the same service
     */

    const url = new URL(`${req.protocol}://${req.get("host")}${req.originalUrl}`)
    let requestedURL = new URLSearchParams(url.search).get("url")

    if (!requestedURL) {
        res.status(500).json({status: "error", error: "Invalid URL supplied"})
        return
    }
    requestedURL = requestedURL.replace("%2", "/")
    console.log(requestedURL)

    //Validate URL
    const jobId = await models.Job.create({url: requestedURL})

    let pollTime = 0

    //Wait until job completes
    const poll = async () => {
        pollTime += config.TRY_POLLTIME_MS
        if (pollTime > config.TRY_TIMEOUT_MS) {
            res.status(500).json({status: "error", error: "Request timed out"})
            return
        }

        let job = await sequelize.query<Job>(
            `
        SELECT id, url, status, structure, debug
        FROM job
        WHERE (status='complete' OR status='error') AND id=:id
        `,
            {
                type: QueryTypes.SELECT,
                replacements: {id: jobId.id},
                plain: true
            }
        )

        if (job) res.json(job)
        else setTimeout(poll, config.TRY_POLLTIME_MS)
    }

    setTimeout(poll, config.TRY_START_POLL_MS)
}

/**
 * Helper function to authenticate api keys and rate limit
 */
const authenticate = async (req: Request): Promise<boolean> => {
    console.log(req.headers.authorization)
    if (!req.headers.authorization) {
        return false
    }

    // Do authorization here

    // We may also want to do a domain based rate limit

    return true
}
