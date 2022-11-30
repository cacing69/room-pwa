import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";

import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    VitePWA({
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "room.svg"],
      mode: "development",
      base: "/",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        sourcemap: true,
        cleanupOutdatedCaches: false,
      },
      injectRegister: "auto",
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
      },
      manifest: {
        name: "Room PWA",
        short_name: "Room PWA",
        theme_color: "#FEC22C",
        start_url: "/",
        display: "standalone",
        background_color: "#FEC22C",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
