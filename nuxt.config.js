//const pkg = require("./package");
const glob = require('glob')
let files = glob.sync('**/*.md',{cwd: 'articles'});

function getSlugs(post, _) {
  let slug = post.substr(0, post.lastIndexOf('.'));
  return `/blog/${slug}`;
}

module.exports = {
  mode: "universal",
  head: {
    title: "Nicolò Rebughini | Sysadmin // Webdev",
    titleTemplate: "%s - Nicolò Rebughini | Sysadmin // Webdev",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Hi, I'm Nicolò, a Linux system administrator focusing on email deliverability, system standardisation, deployment automation and containerisation."
      },
      {
        hid: "keywords",
        name: "keywords",
        content: "vuejs, nuxt, javascript, sysadmin, frontend, ansible, mongodb, docker"
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
  loading: { color: "#fff" },
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  css: [ "assets/main.scss" ],
  plugins: [],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "@nuxtjs/google-analytics"
  ],
  googleAnalytics: {
    id: "UA-133940660-1"
  },
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        use: ['raw-loader']
      });
      config.node = {
        fs: 'empty',
        glob: 'empty'
      };
    }
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        if (to.matched.length < 2) {
          position = { x: 0, y: 0 }
        } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
          position = { x: 0, y: 0 }
        }
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  },
  generate: {
    routes: function() {
      return files.map(getSlugs)
    }
  }
};
