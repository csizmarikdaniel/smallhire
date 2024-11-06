import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    watch: false,
    clearMocks: true,
    globalSetup: ["./src/test/setup-env.ts"],
  },
});
