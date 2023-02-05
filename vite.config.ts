import react from "@vitejs/plugin-react"
import path, { resolve } from "path"
import { defineConfig } from "vite"

import svgr from "vite-plugin-svgr"

import manifest from "./manifest"
import addHmr from "./utils/plugins/add-hmr"
import customDynamicImport from "./utils/plugins/custom-dynamic-import"
import makeManifest from "./utils/plugins/make-manifest"

const outDir = resolve(__dirname, "dist")
const publicDir = resolve(__dirname, "public")
const root = resolve(__dirname, "src")
const pagesDir = resolve(root, "pages")
const assetsDir = resolve(root, "assets")
const componentsDir = resolve(root, "components")
const themeDir = resolve(root, "theme")
const iconsDir = resolve(root, "icons")

const isDev = process.env.__DEV__ === "true"
const isProduction = !isDev

// ENABLE HMR IN BACKGROUND SCRIPT
const enableHmrInBackgroundScript = true

export default defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir,
      "@components": componentsDir,
      "@theme": themeDir,
      "@icons": iconsDir,
    },
  },
  plugins: [
    react(),
    makeManifest(manifest),
    customDynamicImport(),
    addHmr({ background: enableHmrInBackgroundScript, view: true }),
    svgr({
      exportAsDefault: true,
    }),
  ],
  publicDir,
  build: {
    outDir,
    /** Can slowDown build speed. */
    // sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    rollupOptions: {
      input: {
        content: resolve(pagesDir, "content", "index.ts"),
        background: resolve(pagesDir, "background", "index.ts"),
        popup: resolve(pagesDir, "popup", "index.html"),
        prompt: resolve(pagesDir, "prompt", "index.html"),
      },
      watch: {
        include: ["src/**", "vite.config.ts"],
        exclude: ["node_modules/**", "src/**/*.spec.ts"],
      },
      output: {
        entryFileNames: "src/pages/[name]/index.js",
        chunkFileNames: "assets/js/[name].js",
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = path.parse(assetInfo.name)
          const assetFolder = dir.split("/").at(-1)
          const name = assetFolder + firstUpperCase(_name)
          return `assets/[ext]/${name}.[ext]`
        },
      },
    },
  },
})

function firstUpperCase(str: string) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, "g")
  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase())
}
