import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // or '0.0.0.0' for external access
    port: 5173,
    strictPort: true, // Fail if port 5173 is already in use
    hmr: {
      protocol: 'ws', // Ensure WebSocket is used
      host: 'localhost',
      port: 5173,
    },
  },
});
