import { registerAs } from "@nestjs/config";
import { isInt } from "class-validator";
import { DataSourceOptions } from "typeorm";

import * as path from 'path'

export default registerAs('database', (): DataSourceOptions => {

    const envs = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']
    envs.forEach(env => {
        if (!process.env[env]) throw new Error(`Missing environment variable "${env}".`)
    })

    const port = Number(process.env.DB_PORT)
    if (!isInt(port)) throw new Error(`Invalid DB_PORT.`)

    return {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: port,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [path.join(process.cwd(), './dist/src/**/*.entity.js')],
        migrations: [path.join(process.cwd(), './dist/src/migrations/*.js')],
        synchronize: false,
        logging: process.env.NEST_ENV === 'development'
    }

})