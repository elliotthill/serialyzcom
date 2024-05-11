import {Express} from "express"
//SPA entry
import routes from "./index.js"
import dashboard from "./dashboard/index.js"

//Auth API - MUST BE UNCACHED
import user from "./api/user.js"
import srv from "./api/srv.js"
import secret from "./api/secret/index.js"

const defineRoutes = (app: Express) => {
    app.use("/api/user", user)
    app.use("/api/srv", srv)
    app.use("/api/secret", secret)

    app.use("/", routes)
    app.use("/register", routes)
    app.use("/login", routes)
    app.use("/test-drive", routes)

    app.use("/dashboard/", dashboard)
}

export default defineRoutes
