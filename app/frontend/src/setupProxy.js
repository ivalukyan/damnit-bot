const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://ivalukyan-backend-damnitbot-12c1.twc1.net',
            changeOrigin: true,
            pathRewrite: {'^/api': ''},
        })
    );

    app.use(
        '/wss',
        createProxyMiddleware({
            target: 'wss://ivalukyan-backend-damnitbot-12c1.twc1.net',
            ws: true,
            changeOrigin: true,
            pathRewrite: { '^/wss': '' },
        })
    );
};
