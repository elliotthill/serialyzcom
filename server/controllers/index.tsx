import express, {Request, Response, NextFunction} from 'express';
import pug, { render } from 'pug';

import {hybridRenderView, serverRenderView} from '../controllers/utils/render_view.js';
import IndexReact from '../views/index.js';

import {models, sequelize} from '../models/index.js';
import renderCache from '../middleware/render_cache.js';
renderCache.set_store(models.RenderCacheStore, "findByPk", "upsert");


export function Index (req: Request, res: Response, next: NextFunction) {

    const htmlRender = serverRenderView("index.pug", IndexReact,
                        {title:"Title",version:"1"}, {data:"React data"});

    renderCache.push(req.path, htmlRender);
    res.send(htmlRender);
}

