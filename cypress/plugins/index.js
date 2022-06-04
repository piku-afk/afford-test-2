/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const http = require('http');
const next = require('next');
const nock = require('nock');

// start the Next.js server when Cypress starts
module.exports = async (on, config) => {
  const app = next({ dev: true });
  const handleNextRequests = app.getRequestHandler();
  await app.prepare();

  const customServer = new http.Server(async (req, res) => {
    return handleNextRequests(req, res);
  });

  await new Promise((resolve, reject) => {
    customServer.listen(3000, (err) => {
      if (err) {
        return reject(err);
      }
      console.log('> Ready on http://localhost:3000');
      resolve();
    });
  });

  on('task', {
    clearNock() {
      nock.restore();
      nock.cleanAll();

      return null;
    },

    async nock({ hostname, method, path, statusCode, body }) {
      nock.activate();

      console.log(
        'nock will: %s %s%s respond with %d %o',
        method,
        hostname,
        path,
        statusCode,
        body
      );

      // add one-time network stub like
      // nock('https://icanhazdadjoke.com').get('/').reply(200, ...)
      method = method.toLowerCase();
      nock(hostname)[method](path).reply(statusCode, body);

      return null;
    },
  });

  return config;
};
