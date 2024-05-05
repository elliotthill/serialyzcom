import express, {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcrypt';

import {clientRenderView, hybridRenderView, serverRenderView} from '../controllers/utils/render_view.js';
import IndexReact from '../views/index.js';

import {models, sequelize} from '../models/index.js';
import renderCache from '../middleware/render_cache.js';
import passport, { Passport } from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../models/user.js';
renderCache.set_store(models.RenderCacheStore, "findByPk", "upsert");


export function Login (req: Request, res: Response, next: NextFunction) {

    if (req.isAuthenticated()) {
        //You're already logged in
        res.redirect("/");
        return;
    }

    const htmlRender = clientRenderView(res, "index.pug", {canonical:'/login'});

    renderCache.push(req, htmlRender);
    res.send(htmlRender);
}

export function Register (req: Request, res: Response, next: NextFunction) {

    if (req.isAuthenticated()) {
        //You're already logged in
        res.redirect("/");
        return;
    }

    const htmlRender = clientRenderView(res, "index.pug", {canonical:'/login'});

    renderCache.push(req, htmlRender);
    res.send(htmlRender);
}

export function Logout (req: Request, res: Response) {

    req.logout(null!, () => {

        res.redirect("/");
        return;
    });

}

export async function DoRegister (req: Request, res: Response) {


    const user = await models.User.findOne({
        where: {email: req.body.email}
    });

    if (user) {
        res.status(500).json({"status":"error", "error":"There is already a user with this email"});
        return;
    }

    const salt = await bcrypt.genSalt();

    bcrypt.hash(req.body.password, salt, (err, hash: string) => {

        if (err) {
            console.error(`Crypto error: ${err}`);
            res.status(500).json({"status":"error", "error":"Error when calling crypto"});
            return;
        }

        models.User.create({email: req.body.email, password: hash})
        .then((registeredUser) => {

                req.login(registeredUser, (err) => {

                    if (err) {
                        console.error(`Couldn't authenticate registered user ${err}`);
                        res.status(500);
                        return;
                    }
                    res.json({"status":"success"});
                    return;

                });

        })
        .catch((err) => {

                console.warn(err);
                res.status(500).json({"status": "error", "error": "Please enter a valid email address"});
                return;
        });

    });






}
