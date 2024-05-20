import {models, sequelize} from "../index.js"
import Sequelize from "sequelize"
let queryInterface = sequelize.getQueryInterface()

await queryInterface.addColumn("job", "debug", {
    type: Sequelize.JSONB,
    allowNull: true
})

process.exit(0)
