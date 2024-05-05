import { defineConfig } from "tsup"

export const tsup = defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    clean: true
})
