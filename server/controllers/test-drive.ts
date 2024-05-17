import express, { Request, Response, NextFunction } from "express"
import { models, sequelize } from "../models/index.js"
import { hybridRenderView, serverRenderView } from "./utils/render_view.js"
import renderCache from "../middleware/render_cache.js"

import { TestDrive as TryReact } from "../views/test_drive.js"
import { ViewTestDrive as ViewTestDriveReact } from "../views/view_test_drive.js"

import { TestDrives } from "../services/test-drives.js"
const testDrives = new TestDrives(sequelize)
renderCache.set_store(models.RenderCacheStore, "findByPk", "upsert")

export function TestDrive(req: Request, res: Response) {
    const htmlRender = hybridRenderView(res, "index.pug", TryReact, { canonical: "/test-drive" }, { data: "React data" })

    renderCache.push(req, htmlRender)
    res.send(htmlRender)
}

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
        { canonical: "/test-drive" },
        { testDrive: testDriveData }
    )
    renderCache.push(req, htmlRender)
    res.send(htmlRender)
}
