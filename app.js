const express = require('express');
const app = express();
const bodyParser = require("body-parser");
let appRoutes = require('./routes/index');
var session = require("express-session");
const port = process.env.PORT || 8080;
var cors = require('cors');

app.set('port', port);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', appRoutes);
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
app.all('*', function (req, res, next) {


    const env = process.env.NODE_ENV || 'development';
    const config = require(__dirname + '/config/config.json')[env];

    if (config.debug_url) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        fs.appendFile('log_request.log', req.url + ': ' + JSON.stringify(query) + "\n", function (err) {
            if (err) throw err;
        });
    }

    console.log(req.header("Authorization"));
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization ,Accept');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    console.log(req.header("Authorization"));
    next();


});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(port, function () {
    console.log('listen on ', port)
});
