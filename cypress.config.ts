import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  viewportWidth: 1440,
  viewportHeight: 900,

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      require('cypress-localstorage-commands/plugin')(on, config);
      return config;
    }
  }
});
