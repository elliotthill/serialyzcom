import express, {Request, Response, NextFunction} from "express"
import {models, sequelize} from "../models/index.js"
import {hybridRenderView, serverRenderView} from "./utils/render_view.js"
import renderCache from "../middleware/render_cache.js"

import {TestDrive as TryReact} from "../views/test_drive.js"

import {TestDrives} from "../services/test-drives.js"
const testDrives = new TestDrives(sequelize)
renderCache.set_store(models.RenderCacheStore, "findByPk", "upsert")

export function TestDrive(req: Request, res: Response) {
    const htmlRender = hybridRenderView(res, "index.pug", TryReact, {canonical: "/test-drive"}, {data: "React data"})

    renderCache.push(req, htmlRender)
    res.send(htmlRender)
}

export function ViewTestDrive(req: Request, res: Response) {
    const htmlRender = hybridRenderView(res, "index.pug", TryReact, {canonical: "/test-drive"}, {data: "React data"})

    renderCache.push(req, htmlRender)
    res.send(htmlRender)
}
