import express, {Request, Response, NextFunction} from 'express';
import pug, { render } from 'pug';

import {hybridRenderView, serverRenderView} from '../controllers/utils/render_view.js';
import IndexReact from '../../client/assets/js/app.js';
import {Try as TryReact} from './../views/try.js';

import {models, sequelize} from '../models/index.js';
import renderCache from '../middleware/render_cache.js';
renderCache.set_store(models.RenderCacheStore, "findByPk", "upsert");


export function Index (req: Request, res: Response) {

    const htmlRender = serverRenderView(res, "index.pug", IndexReact,
                        {canonical:"/"}, {data:"React data"});

    renderCache.push(req, htmlRender);
    res.send(htmlRender);
}

export function Try(req: Request, res: Response) {

    const htmlRender = hybridRenderView(res, "index.pug", TryReact,
                        {canonical:"/try"}, {data:"React data"});

    renderCache.push(req, htmlRender);
    res.send(htmlRender);
}


