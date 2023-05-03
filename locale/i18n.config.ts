import en from "./en.json";
import de from "./de.json";
import { NuxtI18nOptions } from "@nuxtjs/i18n";
export default {
  locales: ["de", "en"],
  // 'ar',
  defaultLocale:"de",
  vueI18n: {
    fallbackLocale: 'de',
    legacy: false,
    messages: {
      en,
      de,
      // ar,
    },
  },

  strategy: 'prefix_except_default'

} as NuxtI18nOptions;


export const LocaleSelect = [
  {
    name: "English",
    value: "en",
  },
  {
    name: "Deutsch",
    value: "de",
  },
  // {
  //     name: "العربية",
  //     value: "ar"
  // },
];
