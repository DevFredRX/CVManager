export const config = {
    protocol: import.meta.env.PROTOCOL,
    domain: import.meta.env.DOMAIN,
    nest: import.meta.env.NEST_PORT
}

if (!config.protocol) console.warn('Missing PROTOCOL in environment variables.')
if (!config.domain) console.warn('Missing DOMAIN in environment variables.')
if (!config.nest) console.warn('Missing NEST_PORT in environment variables.')