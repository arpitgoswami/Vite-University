import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    build: {
        outDir: 'dist',
    },
    server: {
        historyApiFallback: true,
    },
    resolve: {
        alias: {
            '@axios': path.resolve(__dirname, 'src/utils/axios'),
            '@interface': path.resolve(__dirname, 'src/components/interface'),
            '@cookie': path.resolve(__dirname, 'src/utils/cookieUtils'),
            '@function': path.resolve(__dirname, 'src/utils/functions'),
            '@shared': path.resolve(__dirname, 'src/shared'),
        },
    },
    plugins: [react()],
})
