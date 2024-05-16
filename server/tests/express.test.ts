import {describe, expect, test} from "bun:test"

/*
 * Create express server
 */
import app from "../../app.js"
import http from "http"

//Set ENV variables
process.env.NODE_ENV = "test"

const server = http.createServer(app)
server.listen(3002)
server.on("error", e => console.log(e))
server.on("listening", e => console.log("Listening"))

await Bun.sleep(1000)

describe("ExpressJS", async () => {
    test("Responding with 200 status", async () => {
        const status = await fetch("http://127.0.0.1:3002")
        expect(status.status).toBe(200)
        close()
    })
})

const close = () => {
    server.close(() => {
        console.log("Server closed")
    })
}
