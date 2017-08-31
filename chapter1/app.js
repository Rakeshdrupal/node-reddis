const express = require('express');
const partials = require('express-partials');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const flash = require('connect-flash');
const passport = require('passport');
const RedisStore = require('connect-redis')(session);
const app = express();
const routes = require('./routes');
const errorHandlers = require('./middleware/errorhandlers');
const log = require('./middleware/log');
const util = require('./middleware/utilities');
const config = require('./config');
const auth = require('./auth');
const redis = require('redis').createClient();
app.set('view engine', 'ejs');
app.set('view options', { defaultLayout: 'layout' });
app.use(log.logger);
app.use(partials());
app.use(cookieParser('secret'));
app.use(session({
	secret: config.secret,
	saveUninitialized: true,
	resave: true,
	store: new RedisStore({ host: 'localhost', port: 6397, client: redis})
}
));
app.use(auth.passport.initialize());
app.use(auth.passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(flash());
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);
app.use(util.templateRoutes);
app.use(express.static(__dirname + '/static'));
app.get('/', routes.index);
app.get(config.routes.login, routes.login);
app.post(config.routes.login, routes.loginProcess);
app.get(config.routes.logout, routes.logOut);
app.get('/chat',[util.requireAuthentication], routes.chat);
auth.routes(app);
app.use(errorHandlers.notFound);
app.listen(config.port);
console.log("App server running on port 3000");