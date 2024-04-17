import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

export default defineConfig({
    clearScreen: false,
    plugins: [
        vue({
            script: {
                defineModel: true
            }
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve('src')
        }
    },
    build: {
        target: ['esnext'],
        minify: 'esbuild',
        sourcemap: false
    },
    base: './',
    envDir: './env',
    server: {
        port: 6768,
        strictPort: true,
    }
})
