import {Express} from "express"

import routes from "./index.js"
import dashboard from "./dashboard/index.js"
import testDrive from "./test-drive/index.js"
import user from "./api/user.js"
import srv from "./api/srv.js"
import secret from "./api/secret/index.js"

const defineRoutes = (app: Express) => {
    ///Top level URLS
    app.use("/", routes)
    app.use("/register", routes)
    app.use("/login", routes)

    ///API urls
    app.use("/api/user", user)
    app.use("/api/srv", srv)
    app.use("/api/secret", secret)

    //Section URLS
    app.use("/test-drive/", testDrive)
    app.use("/dashboard/", dashboard)
}

export default defineRoutes
