import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default ({ mode, command }) => {
    const env = loadEnv(mode, process.cwd())
    const { VITE_APP_SERVER_URL, VITE_APP_BASE_API } = loadEnv(mode, 'env')
    return defineConfig({
        base: './',
        envDir: resolve(__dirname, 'env'),
        plugins: [vue()],
        resolve: {
            alias: {
                // 设置别名
                '@': resolve(__dirname, './src')
            },
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
        },
        // vite 相关配置
        server: {
            port: 2800,
            host: true,
            open: false,
            watch: {
                ignored: ['**/node_modules/**', '**/dist/**']
            },
            proxy: {
                [VITE_APP_BASE_API]: {
                    target: VITE_APP_SERVER_URL,
                    changeOrigin: true,
                    rewrite: (p) => p.replace(/^\/ac/, '/ac')
                }
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "src/assets/style/index.scss";`
                }
            }
        }
    })
}
