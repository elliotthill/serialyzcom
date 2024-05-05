import express, {Request, Response, NextFunction} from 'express';
import pug, { render } from 'pug';

import {clientRenderView} from '../controllers/utils/render_view.js';

import {models, sequelize} from '../models/index.js';


export function Index (req: Request, res: Response, next: NextFunction) {

    const htmlRender = clientRenderView(res, "index.pug", {canonical:"/dashboard"});

    res.send(htmlRender);
}
