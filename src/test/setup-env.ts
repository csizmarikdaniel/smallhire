import { loadEnvConfig } from "@next/env";

export function setup() {
  loadEnvConfig(process.cwd());
}
