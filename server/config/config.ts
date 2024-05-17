type ConfigType = {
    [key: string]: any
}
import SQLite from "sqlite3"
const config: ConfigType = {
    development: {
        username: "write",
        password: "password",
        database: "serialyzer",
        host: "127.0.0.1",
        port: 5432,
        dialect: "postgres",
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        },
        logging: false
    },
    test: {
        //validateOnly: true,
        dialect: "sqlite",
        storage: ":memory:",
        dialectOptions: {
            // Your sqlite3 options here
            // for instance, this is how you can configure the database opening mode:
            mode: SQLite.OPEN_READWRITE
        },
        logging: false
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: 5432,
        dialect: "postgres",
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        },
        logging: false
    }
}
export default config
