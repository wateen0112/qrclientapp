// https://v3.nuxtjs.org/api/configuration/nuxt.config
import i18nConfig from "./locale/i18n.config"
import postCssRtl from 'postcss-rtlcss'
import { fileURLToPath, URL } from 'url'
export default defineNuxtConfig({
  ssr: true,
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in' // default
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in' // default

    }


  },

  css: ['vuetify/lib/styles/main.sass', '~/assets/index.scss', '~/assets/rtl.scss', 'vue-toastification/dist/index.css'],
  build: {
    transpile: ['vuetify', 'vue-toastification', 'vue-flatpickr-component'],

  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      postcss: {
        plugins: [
          postCssRtl({
            mode: "override"
          }),

        ]
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url)),
        '~': fileURLToPath(new URL('./', import.meta.url)),
      }
    },

  },

  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  i18n: i18nConfig
})
