export default defineNuxtPlugin(nuxtApp => {
    // onLanguageSwitched called right after a new locale has been set
    nuxtApp.$i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    }
})