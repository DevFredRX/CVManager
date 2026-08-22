import axios from 'axios'

const protocol = import.meta.env.PROTOCOL
const domain = import.meta.env.DOMAIN
const port = import.meta.env.NEST_PORT

const api = axios.create({
    baseURL: `${protocol}://${domain}:${port}`,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
})

export default api