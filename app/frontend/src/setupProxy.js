const { createProxyMiddleware } = require('http-proxy-middleware');

// Настройка прокси для API-запросов
app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://ivalukyan-backend-damnitbot-12c1.twc1.net',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // Убирает /api из пути
    })
);

// Настройка прокси для WebSocket соединений
app.use(
    '/wss',
    createProxyMiddleware({
        target: 'wss://ivalukyan-backend-damnitbot-12c1.twc1.net',
        ws: true, // Включение поддержки WebSocket
        changeOrigin: true,
        pathRewrite: { '^/wss': '' },
    })
);

