import express, {Request, Response, NextFunction} from "express"
import {models, sequelize} from "../models/index.js"
import {hybridRenderView, serverRenderView} from "./utils/render_view.js"
import renderCache from "../middleware/render_cache.js"

import IndexReact from "../views/index.js"

import {TestDrives} from "../services/test-drives.js"
renderCache.set_store(models.RenderCacheStore, "findByPk", "upsert")
const testDrives = new TestDrives(sequelize)

export async function Index(req: Request, res: Response) {
    const testDriveData = await testDrives.getLatest()

    const htmlRender = serverRenderView(res, "index.pug", IndexReact, {canonical: "/"}, {testDrives: testDriveData})

    renderCache.push(req, htmlRender)
    res.send(htmlRender)
}
