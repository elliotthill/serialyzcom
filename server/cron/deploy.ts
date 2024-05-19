import {models, sequelize} from "../models/index.js"
import {QueryTypes} from "sequelize"

const deleteAllCaches = `
                DELETE
                FROM render_cache`

sequelize
    .query(deleteAllCaches, {
        type: QueryTypes.DELETE
    })
    .then(result => process.exit())
