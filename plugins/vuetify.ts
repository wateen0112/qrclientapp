
import { createVuetify, DefaultsInstance, ThemeDefinition, VuetifyOptions } from 'vuetify'
import * as components from 'vuetify/components'
import '@mdi/font/scss/materialdesignicons.scss' // Ensure you are using css-loader
import * as directives from 'vuetify/directives'
import { Vuetify } from 'vue'





export default defineNuxtPlugin(nuxtApp => {
  const theme: ThemeDefinition = {
    dark: false,
    colors: {
      primary: '#FFD736',
      secondary: '#DD0000',
      surface: '#ffffff',
      dark: '#263238',
      onDark: '#EFE8E8',
    }
  }
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'mainTheme',
      themes: { mainTheme: theme }
    },
    defaults: {

      VCheckbox: {
        color: 'primary'
      },
      VBtn: {
        variant: 'flat'
      },

    },
    components,
    directives,

  } as VuetifyOptions)
  nuxtApp.vueApp.use(vuetify as any)
})