import {Sequelize} from "sequelize"
import {QueryTypes} from "sequelize"

export class TestDrives {
    private db: Sequelize

    constructor(db: Sequelize) {
        this.db = db
    }

    async getOne(id: number) {
        return await this.db.query(
            `
            SELECT id, url, jsonb_pretty(structure) as structure, jsonb_pretty(debug) as debug, completed
            FROM job
            WHERE id=:id
            `,
            {
                replacements: {id: id},
                type: QueryTypes.SELECT,
                plain: true
            }
        )
    }

    async getLatest() {
        return await this.db.query(
            `
            SELECT id, url, CONCAT(SUBSTRING(jsonb_pretty(structure) from 0 for 750),'...') as structure, completed
            FROM job
            WHERE status='complete' AND  LENGTH(structure::text) > 2
            ORDER BY completed DESC
            LIMIT 4
            `,
            {
                type: QueryTypes.SELECT
            }
        )
    }
}
