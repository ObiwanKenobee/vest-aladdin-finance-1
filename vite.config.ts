import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2015",
    minify: "terser",
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
          ],
          "vendor-charts": ["recharts"],
          "vendor-forms": ["@hookform/resolvers", "react-hook-form"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-icons": ["lucide-react"],

          // Feature chunks
          auth: [
            "./src/components/auth/AuthProvider",
            "./src/components/auth/LoginModal",
            "./src/components/EnterpriseSecurityProvider",
            "./src/services/enterpriseAuthService",
          ],
          analytics: [
            "./src/components/EnterpriseOperationalDashboard",
            "./src/components/UserInteractionDashboard",
            "./src/services/interactiveAnalyticsService",
            "./src/services/userInteractionService",
          ],
          payments: [
            "./src/components/PaymentProcessor",
            "./src/components/PaymentDashboard",
            "./src/services/enterprisePaymentService",
          ],
          security: [
            "./src/components/SecurityDashboard",
            "./src/services/ciscoXDRService",
          ],
          seo: ["./src/services/seoTrafficService", "./src/components/SEOHead"],
          services: [
            "./src/services/concurrentDataProcessor",
            "./src/services/enterpriseAPIGateway",
            "./src/services/globalLanguageService",
            "./src/services/localizationService",
          ],
        },
        // Generate better chunk names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId
                .split("/")
                .pop()
                ?.replace(".tsx", "")
                .replace(".ts", "")
            : "chunk";
          return `assets/${facadeModuleId}-[hash].js`;
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: [
          "console.log",
          "console.info",
          "console.debug",
          "console.trace",
        ],
      },
      mangle: {
        safari10: true,
      },
      format: {
        safari10: true,
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    cors: true,
    // Removed proxy configuration since we don't have a separate API server
    // All API calls are handled by the frontend services
  },
  preview: {
    port: 4173,
    host: true,
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
      "lucide-react",
      "recharts",
    ],
    exclude: ["@vite/client", "@vite/env"],
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
    target: "es2020",
  },
  define: {
    // Global constants for performance
    __DEV__: process.env.NODE_ENV === "development",
    __PROD__: process.env.NODE_ENV === "production",
    // SEO and analytics
    __SITE_URL__: JSON.stringify(
      process.env.VITE_SITE_URL || "https://quantumvest.com",
    ),
    __ANALYTICS_ID__: JSON.stringify(process.env.VITE_ANALYTICS_ID || "GA_ID"),
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
});
