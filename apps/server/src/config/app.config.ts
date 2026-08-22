import { registerAs } from "@nestjs/config"

export default registerAs("app", () => {

    const envs = ['PROTOCOL', 'DOMAIN']
    envs.forEach(env => {
        if (!process.env[env]) throw new Error(`Missing environment variable "${env}".`)
    })

    return {
        protocol: process.env.PROTOCOL!,
        domain: process.env.DOMAIN!
    }

})