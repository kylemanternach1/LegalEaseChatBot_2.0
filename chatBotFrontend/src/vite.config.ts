import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/proxy/capitolai/api/v(\\d+)': {
        target: 'http://localhost:8000/api',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/proxy\/capitolai\/api\/v(\d+)/, '/v$1'),
      },
    },
  },
});