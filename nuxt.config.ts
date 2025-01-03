// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({ 
  runtimeConfig: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY, 
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  plugins: ["~/plugins/v-calendar.js"],
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode",  "@nuxtjs/supabase"],
  colorMode: {
    preference: "cupcake", // default theme
    dataValue: "theme", // activate data-theme in <html> tag
  },
  supabase: {
    redirect: false
  }
});
