const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

    app.use(
        '/tileMapApi',
        createProxyMiddleware({
            target: 'http://localhost:8001',
            changeOrigin: true,
            pathRewrite(path) {
                return path.replace('/tileMapApi', 'http://localhost:8001');
            }
        })
    );
};