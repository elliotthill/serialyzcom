import {models, sequelize} from "../index.js"
import Sequelize from "sequelize"
let queryInterface = sequelize.getQueryInterface()

await queryInterface.addIndex("job", ["requested"], {
    unique: false,
    name: "job_requested_idx"
})
console.info(`job->requested index created`)

await queryInterface.addIndex("job", ["status"], {
    unique: false,
    name: "job_status_idx"
})
console.info(`job->status index created`)

process.exit(0)
