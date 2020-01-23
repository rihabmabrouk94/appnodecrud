const express = require('express');
const app = express();
const bodyParser = require("body-parser");
let appRoutes = require('./routes/index');
const port = process.env.PORT || 8080;
app.set('port', port);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', appRoutes);

app.listen(port, function () {
    console.log('listen on ', port)
});
