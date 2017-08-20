const express = require('express');
const partials = require('express-partials');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const RedisStore = require('connect-redis')(session);
const app = express();
const routes = require('./routes');
const errorHandlers = require('./middleware/errorhandlers');
const log = require('./middleware/log');
const util = require('./middleware/utilities');
app.set('view engine', 'ejs');
app.set('view options', { defaultLayout: 'layout' });
app.use(log.logger);
app.use(partials());
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    store: new RedisStore(
        { url: 'redis://localhost' })
})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(csrf());
//app.use(util.csrf());
app.use(express.static(__dirname + '/static'));
app.use(function (req, res, next) {
    app.locals.token = req.csrfToken();

    
    next();
});
app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginProcess);
app.get('/chat', routes.chat);
app.use(errorHandlers.notFound);
app.listen(3030);
console.log("App server running on port 3000");