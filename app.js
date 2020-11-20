const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// This will be our application entry. We'll setup our server here.
const http = require('http');
const cors = require('cors');
// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Setup a default catch-all route that sends back a welcome message in JSON format.
//Models
var models = require('./models');
const { Console } = require('console');
app.use(cors());
app.use(express.static('assets'));
//sync databse
models.sequelize.sync().then(function(){
    console.log('DB connneted');
}).catch(function(err){
    console.log('DB not connneted');
    console.log(err);
});

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
message: 'Welcome to the NAAC',
}));
const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;