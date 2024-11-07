import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    watch: false,
    clearMocks: true,
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    globals: true,
    environment: "node",
    setupFiles: ["./src/test/setup-env.ts", "./src/test/setup-db.ts"],
  },
});
