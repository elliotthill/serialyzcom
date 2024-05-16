import "dotenv/config"
//Express framework
import express, {Request, Response, NextFunction} from "express" //const express = require('express');
//Express session
import session from "express-session" //const session = require('express-session');
import connectSessionSequelize from "connect-session-sequelize" //const sequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelizeStore = connectSessionSequelize(session.Store)

//Necessary modules
import path from "path"

import favicon from "serve-favicon"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

//Authentication
import passport from "passport"
import "./server/config/passport.js"

const app = express()
const ENV = env.NODE_ENV

if (!process.env.API_POLL_KEY) throw Error("API_POLL_KEY not set")
if (!process.env.NODE_ENV) throw Error("NODE_ENV not set")
if (!process.env.COOKIE_SECRET) throw Error("COOKIE_SECRET not set")
/*
 * ES6 __dirname
 */
import {fileURLToPath} from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import compression from "compression"
app.use(compression())

/*
 * Security
 */
//Template Rendering
app.set("views", path.join(__dirname, "client/views"))
app.set("view engine", "pug")

app.set("node_modules", path.join(__dirname, "client/node_modules"))

//Favicon
app.use(favicon(path.join(__dirname, "client", "/assets/images/favicon.ico")))

app.use(bodyParser.json({limit: 1024 * 1024 * 20}))
app.use(bodyParser.urlencoded({extended: true, limit: 1024 * 1024 * 20}))
app.use(cookieParser())

let today = new Date()
import {models, sequelize} from "./server/models/index.js"

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        cookie: {
            expires: new Date(today.getFullYear() + 10, today.getMonth(), today.getDate())
        },
        store: new sequelizeStore({
            db: sequelize,
            checkExpirationInterval: 24 * 15 * 60 * 1000 // The interval at which to cleanup expired sessions in milliseconds.
        }),
        resave: false,
        saveUninitialized: false
    })
)

app.use(passport.initialize())
app.use(passport.session())
app.post("/api/user/login", passport.authenticate("local"), function (req: Request, res: Response) {
    res.json({meta: "success"})
})

//Expose passport user info in all views
app.use(function (req, res, next) {
    res.locals.version = process.env.npm_package_version
    res.locals.title = process.env.npm_package_name

    if (req.isAuthenticated()) {
        res.locals.user = req.user
        res.locals.authed = true
    }
    res.locals.baseURL = "https://jsondroid.com"
    next()
})

app.use(express.static(path.join(__dirname, "client")))
app.use(express.static(path.join(__dirname, "client/dist")))

import renderCache from "./server/middleware/render_cache.js"
import {env} from "process"
renderCache.set_store(models.RenderCacheStore, "findByPk", "upsert")
app.use(renderCache.middleware)

app.get("/robots.txt", function (req: Request, res: Response) {
    res.type("text/plain")

    if (ENV === "production") {
        res.send("User-agent: *\nDisallow: /admin/")
    } else {
        res.send("User-agent: *\nDisallow: /")
    }
})

import defineRoutes from "./server/routes/routes.js"
defineRoutes(app)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    res.status(404)

    // respond with html page
    if (req.accepts("html")) {
        res.render("error", {code: 404, url: req.url})
        return
    }

    // respond with json
    if (req.accepts("json")) {
        res.json({error: "Not found"})
        return
    }

    // default to plain-text. send()
    res.type("txt").send("Not found")
})

// error handlers
if (ENV === "development" || ENV === "docker" || ENV === "test") {
    console.log("RUNNING IN DEV MODE....")

    app.set("view cache", false)

    // development error handler
    // will print stacktrace
    app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
        console.log(err)

        res.status(err.status || 500)
        res.render("error", {
            message: err.message,
            error: err
        })
    })
} else if (ENV === "production" || ENV === "staging") {
    app.set("view cache", false)

    // no stacktraces leaked to user
    app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
        console.error(err) //Temporarily log errors on prod

        res.status(err.status || 500)
        res.render("error", {
            message: "Uh-oh. Something went wrong.",
            error: {}
        })
    })
} else {
    throw new Error("You must specify an environment")
}

//All done
export default app
