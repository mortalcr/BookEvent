// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  plugins: ["~/plugins/v-calendar.js"],
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  colorMode: {
    preference: "cupcake", // default theme
    dataValue: "theme", // activate data-theme in <html> tag
  },
});
