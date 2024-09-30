// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    colorMode: {
        preference: 'cupcake', // default theme
        dataValue: 'theme', // activate data-theme in <html> tag
    },
})
