const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://ivalukyan-damnit-bot-a1d6.twc1.net',
            changeOrigin: true,
            pathRewrite: {'^/api': ''},
        })
    );

    app.use(
        '/ws',
        createProxyMiddleware({
            target: 'wss://ivalukyan-damnit-bot-a1d6.twc1.net',
            ws: true,
            changeOrigin: true,
            pathRewrite: { '^/ws': '' },
        })
    );
};
