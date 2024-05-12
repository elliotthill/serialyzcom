import express, {Request, Response, NextFunction} from "express"

import {hybridRenderView, serverRenderView} from "./utils/render_view.js"
import IndexReact from "../views/index.js"
import {TestDrive as TryReact} from "../views/test_drive.js"

import {models, sequelize} from "../models/index.js"
import renderCache from "../middleware/render_cache.js"
renderCache.set_store(models.RenderCacheStore, "findByPk", "upsert")

import {TestDrives} from "../services/test-drives.js"
const testDrives = new TestDrives(sequelize)

export async function Index(req: Request, res: Response) {
    const testDriveData = await testDrives.getLatest()

    const htmlRender = hybridRenderView(res, "index.pug", IndexReact, {canonical: "/"}, {testDrives: testDriveData})

    renderCache.push(req, htmlRender)
    res.send(htmlRender)
}

export function TestDrive(req: Request, res: Response) {
    const htmlRender = hybridRenderView(res, "index.pug", TryReact, {canonical: "/test-drive"}, {data: "React data"})

    renderCache.push(req, htmlRender)
    res.send(htmlRender)
}
