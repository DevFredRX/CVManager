import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

import fs from 'fs'
import path from 'path'

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, path.resolve(process.cwd(), '../'), ['VITE_', 'PROTOCOL', 'DOMAIN', 'NEST_PORT'])

  return {
    cacheDir: path.resolve(process.cwd(), '../../node_modules/.vite'),
    plugins: [react()],
    envPrefix: ['VITE_', 'PROTOCOL', 'DOMAIN', 'NEST_PORT'],
    server: {
      https: {
        key: fs.readFileSync(path.resolve(process.cwd(), '../ssl/localhost.key')),
        cert: fs.readFileSync(path.resolve(process.cwd(), '../ssl/localhost.crt'))
      },
      port: parseInt(env.VITE_PORT),
      strictPort: true,
      host: true
    },
    resolve: {
      alias: {
        '@public': path.resolve(process.cwd(), '../public'),
        '@assets': path.resolve(process.cwd(), './public'),
        '@styles': path.resolve(process.cwd(), './src/assets/styles'),
        '@scripts': path.resolve(process.cwd(), './src/assets/scripts'),
        '@config': path.resolve(process.cwd(), './src/config'),
        '@layouts': path.resolve(process.cwd(), './src/layouts'),
        '@components': path.resolve(process.cwd(), './src/components'),
        '@pages': path.resolve(process.cwd(), './src/pages')
      }
    },
    define: {
      'import.meta.env.PROTOCOL': JSON.stringify(env.PROTOCOL),
      'import.meta.env.DOMAIN': JSON.stringify(env.DOMAIN),
      'import.meta.env.NEST_PORT': JSON.stringify(env.NEST_PORT)
    }
  }

})
