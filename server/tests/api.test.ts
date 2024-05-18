import {describe, expect, test} from "bun:test"

//Make test in memory DB
process.env.NODE_ENV = "test"
import {Database} from "sqlite3"
const db = new Database(":memory:")

//Boot up express
import app from "../../app.js"
import http from "http"
const server = http.createServer(app)

//Wait for it to finish
server.listen(3002)
const waitForServer = (server: http.Server): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        server.on("listening", _ => resolve(true))
    })
}
console.time("Express boot")
await waitForServer(server)
console.timeEnd("Express boot")

//Sync our schema to sqlite
import {models, sequelize} from "../models/index.js"
await sequelize.sync()

describe("ExpressJS", async () => {
    test("Responding with 200 status", async () => {
        const status = await fetch("http://127.0.0.1:3002/")
        expect(status.status).toBe(200)
        close()
    })
})

const close = () => {
    server.close(() => {
        console.log("Server closed")
        process.exit()
    })
}
