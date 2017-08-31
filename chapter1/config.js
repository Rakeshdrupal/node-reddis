var config = {
    port: 3000,
    secret: 'secret',
    redisUrl: 'redis://localhost',
    routes: {
        login: '/account/login',
        logout: '/account/logout',
        chat: '/chat',
        facebookAuth: '/auth/facebook',
        facebookAuthCallback: '/auth/facebook/callback'
    },
    host: 'http://localhost:3000',
    facebook: {
        appID: '1707490516165575',
        appSecret: 'aa4885b462c1ac372e7b4cd235ce70b4'
    }
};
module.exports = config;