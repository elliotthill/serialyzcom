import {Express} from "express"

import routes from "./index.js"
import dashboard from "./dashboard/index.js"
import testDrive from "./test-drive/index.js"
import user from "./api/user.js"
import srv from "./api/test_drive.js"
import secret from "./api/secret/index.js"

import v1 from "./api/v1/index.js"

const defineRoutes = (app: Express) => {
    ///Top level URLS
    app.use("/", routes)
    app.use("/register", routes)
    app.use("/login", routes)

    ///API urls
    app.use("/api/user", user)
    app.use("/api/test-drive/", srv)
    app.use("/api/secret", secret)
    app.use("/api/v1", v1)

    //Section URLS
    app.use("/test-drive/", testDrive)
    app.use("/dashboard/", dashboard)
}

export default defineRoutes
