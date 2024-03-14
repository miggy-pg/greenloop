import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

const aliases = {
  api: "src/api",
  assets: "src/assets",
  components: "src/components",
  constants: "src/constants",
  hooks: "src/hooks",
  modules: "src/modules",
  utils: "src/utils",
  types: "src/types",
};

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    resolve(__dirname, value),
  ])
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCommonjs()],
  define: { global: "globalThis" },
  // build: {
  //   rollupOptions: {
  //     external: [
  //       "react", // ignore react stuff
  //       "react-dom",
  //     ],
  //   },
  // },
  // resolve: {
  //   alias: {
  //     ...resolvedAliases,
  //     "./runtimeConfig": "./runtimeConfig.browser",
  //     "jss-plugin-{}": "jss-plugin-global",
  //   },
  // },
  // define: { global: "globalThis" },
});
