import express, {Request, Response, NextFunction} from 'express';

import {clientRenderView, hybridRenderView, serverRenderView} from '../controllers/utils/render_view.js';
import IndexReact from '../views/index.js';

import {models, sequelize} from '../models/index.js';
import renderCache from '../middleware/render_cache.js';
renderCache.set_store(models.RenderCacheStore, "findByPk", "upsert");


export function Login (req: Request, res: Response, next: NextFunction) {

    const htmlRender = clientRenderView(res, "index.pug", {canonical:'/login'});

    //renderCache.push(req.path, htmlRender);
    res.send(htmlRender);
}

export function Register (req: Request, res: Response, next: NextFunction) {

    const htmlRender = clientRenderView(res, "index.pug", {canonical:'/login'});

    //renderCache.push(req.path, htmlRender);
    res.send(htmlRender);
}
