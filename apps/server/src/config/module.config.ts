import { LogLevel } from "@nestjs/common"
import { registerAs } from "@nestjs/config"

export default registerAs("module", () => {

    const envs = ['VITE_PORT', 'NEST_ENV', 'NEST_PORT']
    envs.forEach(env => {
        if (!process.env[env]) throw new Error(`Missing environment variable "${env}".`)
    })

    const validEnvs = ['development', 'production', 'default']
    if (!validEnvs.includes(process.env.NEST_ENV!)) throw new Error(`Invalid NEST_ENV ("${process.env.NEST_ENV}"). Expected values: ${validEnvs.join(', ')}.`)

    const level: LogLevel[] = process.env.NEST_ENV === 'production' ? ['error', 'warn', 'log'] : process.env.NEST_ENV === 'default' ? ['error', 'warn', 'log', 'debug', 'verbose'] : ['error', 'warn', 'log', 'debug', 'verbose']

    return {
        level: level,
        environment: process.env.NEST_ENV!,
        frontend: `${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.VITE_PORT}`,
        backend: `${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.NEST_PORT}`
    }

})