const express = require('express');
const app = express();
const bodyParser = require("body-parser");
let appRoutes = require('./routes/index');
var session = require("express-session");
const port = process.env.PORT || 8080;
app.set('port', port);
app.use(express.json());
app.use(bodyParser.json());
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
app.listen(port, function () {
    console.log('listen on ', port)
});
