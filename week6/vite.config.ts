import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/v1": {
        target: "http://localhost:8000", // Nest 백엔드 포트
        changeOrigin: true,
        // 프론트에서 /v1/... 로 호출하면 그대로 백엔드 /v1/... 로 전달
      },
    },
  },
});
