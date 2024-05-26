import {request, Request} from "express"
import {isArray} from "util"

export const getReqIp = (req: Request) => {
    let ip: string | undefined = undefined

    //Cloudflare puts the real remote IP here
    const forwarded = req.headers["x-forwarded-for"]

    if (forwarded) {
        if (!Array.isArray(forwarded)) {
            ip = forwarded
        } else {
            ip = forwarded[0]
        }
    } else {
        //Probably on dev env
        ip = req.socket.remoteAddress
    }

    return ip
}
