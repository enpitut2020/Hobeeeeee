import * as FontAwesome from './plugins/fontawesome'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "hobeeeeee",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // node.js module but we specify the pre-processor
    { src: '~assets/main.scss', lang: 'scss' }
    // { src: 'bulma/bulma.sass', lang: 'sass' }
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/firebaseUtils",
    "~/plugins/firebase",
    '~/plugins/adobe-fonts',
    '~/plugins/vue-scrollto',
    {
      src: "@/plugins/vue-mavon-editor",
      srr: false,
    },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    ['@nuxtjs/fontawesome', { component: 'fontAwesome', suffix: true }]
  ],
  fontawesome: {
    icons: {
      solid: FontAwesome.solid,
      regular: FontAwesome.regular,
      brands: FontAwesome.brands
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
            "@nuxtjs/bulma",
          ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },

  // 再読込エラーの解消
  generate: {
    fallback: true,
  },
};
