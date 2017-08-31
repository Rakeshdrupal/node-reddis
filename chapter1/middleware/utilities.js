const config = require('../config');
module.exports = {
    csrf: function (req, res, next) {
        res.locals.token = req.csrfToken();
        next();
    },
    authenticated: function (req, res, next) {
        req.session.isAuthenticated = req.session.passport.user !== undefined;
        res.locals.isAuthenticated = req.session.isAuthenticated;
        if (req.session.isAuthenticated) {
            res.locals.user = req.session.passport.user;
        }
        next();
    },
    requireAuthentication: function (req, res, next) {
        if (req.session.isAuthenticated) {
            next();
        } else {
            res.redirect(config.routes.login);
        }
    },
    auth: function (username, password, session) {
        var isAuth = username === 'joshua' || username === 'brian';
        if (isAuth) {
            session.isAuthenticated = isAuth;
            session.user = {
                username: username
            };
        }
        return isAuth;
    },
    logOut: function logOut(req) {
        req.session.isAuthenticated = false;
        req.logout();
    },
    templateRoutes: function (req, res, next) {
        res.locals.routes = config.routes;
        next();
    }

};
