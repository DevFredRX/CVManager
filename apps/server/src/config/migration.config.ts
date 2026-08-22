import { DataSource } from "typeorm";

import * as dotenv from 'dotenv'
import * as path from 'path'

import databaseConfig from "@config/database.config";

dotenv.config({ path: path.resolve(process.cwd(), '../.env') })

export default new DataSource(databaseConfig())