import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// 🔥 Rollup native 사용 비활성화
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        generatedCode: {
          constBindings: true
        }
      }
    },
    // 🔥 네이티브 모듈 끄기
    target: 'esnext',
    modulePreload: false,
  }
});

