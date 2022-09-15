const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://54.180.148.125:8080',
//       target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://54.180.148.125:8080',
//       target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/employee',
    createProxyMiddleware({
      target: 'http://54.180.148.125:8080',
//       target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/unit',
    createProxyMiddleware({
      target: 'http://54.180.148.125:8080',
//       target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/cal',
    createProxyMiddleware({
      target: 'http://54.180.148.125:8080',
//       target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/chat',
    createProxyMiddleware({
      target: 'http://54.180.148.125:8080',
//       target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/chatroom',
    createProxyMiddleware({
      target: 'http://54.180.148.125:8080',
//       target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/cre',
    createProxyMiddleware({
      target: 'http://54.180.148.125:8080',
//       target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/time',
    createProxyMiddleware({
      target: 'http://54.180.148.125:8080',
//       target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/file',
    createProxyMiddleware({
      target: 'http://54.180.148.125:8080',
//       target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};
