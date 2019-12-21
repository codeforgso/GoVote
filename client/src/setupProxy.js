const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    // If the API_PROXY env variable is set, we proxy to it. Otherwise default to localhost:3001
    const target = process.env.API_PROXY ? process.env.API_PROXY : 'http://localhost:3001'
    app.use(proxy('/api', { target }));
}