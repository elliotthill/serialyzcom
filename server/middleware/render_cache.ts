import {Request, Response, NextFunction} from "express"

let instance: RenderCache

/*
 *
 * RenderCache is the express middleware to serve up cached pages from any store (redis, orm, db, memory)
 * Auth'd users bypass this cache
 */
class RenderCache {
    private store: any //ORM or mock object for testing
    private findOneFunc: string = "findByPk" //Should be an ORM function to return one row by PATH
    private upsertFunc: string = "upsert" //e.g. findByPk for sequelize, get for redis

    constructor() {
        if (!instance) {
            instance = this
        }
        return instance
    }

    set_store = (store: any, findOneFunc: string, upsertFunc: string) => {
        if (!store || !findOneFunc || !upsertFunc)
            throw new Error(`Could not initialize RenderCache.
                                Store, findOneFunc, and upsertFunc is required`)

        this.store = store
        this.findOneFunc = findOneFunc
        this.upsertFunc = upsertFunc
    }

    middleware = async (req: Request, res: Response, next: NextFunction) => {
        //Logged in users don't see the cache
        if (req.query.nocache || req.isAuthenticated() || req.originalUrl.includes("/api/")) {
            next()
            return
        }

        const cache = await this.store[this.findOneFunc](req.baseUrl + req.path)

        if (cache === null) {
            next()
            return
        }

        res.send(cache.html + "<!-- cached -->")
        return
    }

    push = (req: Request, body: string): Promise<boolean> => {
        if (!req.isAuthenticated()) return this.store[this.upsertFunc]({id: req.baseUrl + req.path, html: body})
        else return Promise.resolve(false)
    }
}

export default new RenderCache()
