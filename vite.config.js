import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  port: "3000",
  preview: {
    port: "3000",
  },
  build: {
    sourcemap: false,
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        // 404: resolve(__dirname, "src/404.html"),
        ["about-us"]: resolve(__dirname, "src/about-us.html"),
        contacts: resolve(__dirname, "src/contacts.html"),
      },
    },
  },
  publicDir: "assets",
  plugins: [],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData(source, fp) {
          if (fp.endsWith("variables.scss")) return source;
          return `@import "./src/assets/scss/variables";` + source;
        },
      },
    },
  },
});
