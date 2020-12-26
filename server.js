//

const next = require('next');
const { parse } = require('url');
// const { createServer } = require('http');
// 111

const { Hub } = require('litesocks');

const app = next({ dev: process.env['NODE_ENV'] !== 'production' });
const handle = app.getRequestHandler();

const getHttpPort = () => {

  if (!!process.env['PORT']) {
    return process.env['PORT'];
  } else if (!!process.env['BLUEMIX_REGION'] || !!process.env['KUBERNETES_SERVICE_HOST']) {
    return 8080;
  }

  return 4000;
};

/*
app.prepare().then(() => {

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(getHttpPort(), (err) => {
    if (err) throw err;
    console.log('start ...');
  });

});
*/

const hub = new Hub({
  service: `ws://0.0.0.0:${getHttpPort()}/ss`,
  key: 'www.facebook.com',
  presets: [
    {
      name: 'ss-base'
    },
    {
      name: 'ss-stream-cipher',
      params: {
        method: 'none'
      }
    }
  ],
  log_level: 'error'
});

hub.run()
  .then(() => {
    const server = hub._tcpServer;

    app.prepare().then(() => {
      server.on('request', (req, res) => {
        const parsedUrl = parse(req.url, true);
        req._hub = hub;
        handle(req, res, parsedUrl);
      })
    });

    // console.log(server);
  })
  .catch((err) => {
    // console.error(err);
  });
