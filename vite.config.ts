import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";

import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

const getCache = ({ name, pattern }: any) => ({
  urlPattern: pattern,
  handler: "CacheFirst" as const,
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 365 * 2, // 2 years
    },
    cacheableResponse: {
      statuses: [200],
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    VitePWA({
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "room.svg"],
      mode: "production",
      base: "/",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        sourcemap: true,
        cleanupOutdatedCaches: false,
        // runtimeCaching: [
        //   getCache({
        //     pattern: /^https:\/\/s3.amazonaws.com\/my-library-cover-uploads/,
        //     name: "local-images1",
        //   }),
        //   getCache({
        //     pattern: /^https:\/\/my-library-cover-uploads.s3.amazonaws.com/,
        //     name: "local-images2",
        //   }),
        // ],
        clientsClaim: true,
        skipWaiting: true,
      },
      injectRegister: "auto",
      devOptions: {
        enabled: false,
        type: "module",
        navigateFallback: "index.html",
      },
      manifest: {
        name: "Room PWA",
        short_name: "Room PWA",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
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
