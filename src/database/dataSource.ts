import { DataSource, DataSourceOptions } from "typeorm"
import { SeederOptions } from 'typeorm-extension';
import {userSeed} from './seeds/userSeed'

const opts: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "12345",
    database: "internal_notes",
    entities: ["./src/database/entities/*.ts"],
    migrations: ["./src/database/migrations/*.ts"],
    seeds: [userSeed]
}

const AppDataSource = new DataSource(opts)

AppDataSource.initialize()
.then(() => {
    console.log("Data Source has been initialized!")
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
})

export const getManager = AppDataSource.manager

export default AppDataSource