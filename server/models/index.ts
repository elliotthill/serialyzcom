"use strict"

import {Sequelize} from "sequelize"
const env = process.env.NODE_ENV || "development"

import globalConfig from "../config/config.js"
const config = globalConfig[env]

export const sequelize = new Sequelize(config.database, config.username, config.password, config)

/**
 * We have to verbosely load our models one-by-one at compile time
 * rather than dynamically at runtime, so that typescript can understand them
 */
import userInit, {User} from "./user.js"
import renderCacheStoreInit, {RenderCacheStore} from "./render_cache.js"
import jobInit, {Job} from "./job.js"

userInit(sequelize)
renderCacheStoreInit(sequelize)
jobInit(sequelize)

export const models = {
    User,
    RenderCacheStore,
    Job
}

/*
 * Mock if we are testing
 */
if (process.env.NODE_ENV === "test") {
    console.warn(`Replacing query interface for testing`)
    RenderCacheStore.findByPk = () => []
    RenderCacheStore.upsert = () => []

    sequelize.query = () => []
}
