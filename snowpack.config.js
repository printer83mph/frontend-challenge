// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    "src": "/dist",
    "public": "/"
  },
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/index.html',
    }
  ],
  plugins: [
    "@snowpack/plugin-postcss",
	"@snowpack/plugin-react-refresh"
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    tailwindConfig: './tailwind.config.js',
    open: 'none'
  },
  buildOptions: {
    /* ... */
  },
};
