import express, {Request, Response, NextFunction} from "express"
import {models, sequelize} from "../models/index.js"
import {QueryTypes} from "sequelize"
import {Job} from "../models/job.js"
import {hybridRenderView, serverRenderView} from "./utils/render_view.js"
import renderCache from "../middleware/render_cache.js"

import {TestDrive as TryReact} from "../views/test_drive.js"
import {ViewTestDrive as ViewTestDriveReact} from "../views/view_test_drive.js"

import {TestDrives} from "../services/test-drives.js"
const testDrives = new TestDrives(sequelize)
renderCache.set_store(models.RenderCacheStore, "findByPk", "upsert")

import config from "./config.json" assert {type: "json"}
/**
 * GET Test drive landing page
 *
 * returns HTML
 */
export function TestDrive(req: Request, res: Response) {
    const htmlRender = hybridRenderView(res, "index.pug", TryReact, {canonical: "/test-drive"}, {data: "React data"})

    renderCache.push(req, htmlRender)
    res.send(htmlRender)
}

/**
 * GET View a specific test drive /test-drive/x
 */
export async function ViewTestDrive(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) {
        res.status(500).send()
        return
    }
    const testDriveData = await testDrives.getOne(id)
    const htmlRender = hybridRenderView(
        res,
        "index.pug",
        ViewTestDriveReact,
        {canonical: "/test-drive"},
        {testDrive: testDriveData}
    )
    renderCache.push(req, htmlRender)
    res.send(htmlRender)
}

/**
 * GET Test Drive token to allow anyone to test drive
 * returns JSON
 */
import crypto from "node:crypto"
import {getReqIp} from "./utils/ip.js"
import {createClient} from "redis"
const ONE_MINUTE = 60 * 1
const ONE_DAY = 60 * 60 * 24
const ALLOWED_TEST_DRIVES_IN_PERIOD = 5

///Returns true if ok, false if they are not allow to test drive
async function CheckToken(req: Request): Promise<boolean> {
    const token = crypto.randomBytes(10)

    const ip = getReqIp(req)
    if (!ip) {
        return false
    }

    const redisClient = createClient()
    await redisClient.connect()

    /*
     * Short term token check
     */
    const rateLimit = await redisClient.get(ip + "-rateLimit")
    if (rateLimit) return false

    await redisClient.set(ip + "-rateLimit", 1, {EX: ONE_MINUTE})

    /**
     * Long term token check - X allowed in 24 hours
     * */
    const value = await redisClient.get(ip)
    console.log(value)
    const testDrivesCount = parseInt(value || "0")
    if (testDrivesCount >= ALLOWED_TEST_DRIVES_IN_PERIOD) {
        await redisClient.disconnect()
        return false
    }

    await redisClient.set(ip, testDrivesCount + 1, {EX: ONE_DAY})
    await redisClient.disconnect()
    return true
}

/**
 * Request a Test Drive
 */

export async function RequestTestDrive(req: Request, res: Response) {
    const url: string = req.body.url
    let jobId
    try {
        jobId = await models.Job.create({url: url})
    } catch (e) {
        res.status(500).json({status: "error", error: "Error: URL too long"})
        return
    }

    const canUserTestDrive = await CheckToken(req)
    if (!canUserTestDrive) {
        res.status(500).json({status: "error", error: "You have exceeded the amount of free test drives"})
        return
    }

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

export async function LatestTestDrives(req: Request, res: Response) {
    const testDriveData = await testDrives.getLatest()
    res.json(testDriveData).send()
}

export async function GetSingle(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) {
        res.status(500).send()
        return
    }
    console.log(id)
    const testDriveData = await testDrives.getOne(id)
    res.json(testDriveData).send()
}
