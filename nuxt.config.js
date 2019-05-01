//const pkg = require("./package");
const glob = require('glob')

let files = glob.sync('articles/**/*.md',{});

function getSlugs(post, _) {
  let slug = post.substr(0, post.lastIndexOf('.'));
  slug = slug.substr(slug.lastIndexOf('/') + 1 );
  return `/blog/${slug}`;
}

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: "Nicolò Rebughini | Sysadmin // Webdev",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Nicolò Rebughini is a Linux system administrator focusing on email deliverability, system standardisation and deployment automation"
      },
      {
        hid: "keywords",
        name: "keywords",
        content: "vuejs, nuxt, javascript, sysadmin, ansible, mongodb"
      },
      { name: "robots", content: "index, follow" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@nirebu" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://use.fontawesome.com/releases/v5.6.1/css/all.css",
        integrity:
          "sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP",
        crossorigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Capriola"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  /*
   ** Global CSS
   */
  css: ["assets/main.scss"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "@nuxtjs/google-analytics"
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  googleAnalytics: {
    id: "UA-133940660-1"
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        use: ['raw-loader']
    })
  }
  },
    generate: {
      routes: function() {
          return files.map(getSlugs)
      }
    }
};
