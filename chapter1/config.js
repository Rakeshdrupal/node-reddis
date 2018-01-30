var config = {
    port: 3000,
    secret: 'secret',
    redisUrl: 'redis://localhost',
    routes: {
        login: '/account/login',
        logout: '/account/logout',
        chat: '/chat',
        facebookAuth: '/auth/facebook',
        facebookAuthCallback: '/auth/facebook/callback',
        googleAuth: '/auth/google',
        googleAuthCallback: '/auth/google/callback',
        logout: '/account/logout',
        register: '/account/register',
        facebookAuth: '/auth/facebook',
    },
    host: 'http://localhost:3000',
    facebook: {
        appID: '1707490516165575',
        appSecret: 'aa4885b462c1ac372e7b4cd235ce70b4'
    },
    google: {
        clientID: 'YOUR_GOOGLE_ID',
        clientSecret: 'YOUR_GOOGLE_SECRET'
    },
    crypto: {
        workFactor: 5000,
        keylen: 32,
        randomSize: 256
    }
};
module.exports = config;