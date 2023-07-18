import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    return {
      plugins: [react()],
      define: {
        ENDPOINT: JSON.stringify('http://localhost:8080')
      }
    }
  } else {
    // command === 'build'
    return {
      plugins: [react()],
      define: {
        ENDPOINT: JSON.stringify('http://192.168.1.100:8080')
      }
    }
  }
})