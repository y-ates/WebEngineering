var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
var Sequelize = require('sequelize');

/* config app */
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

var sequelize = new Sequelize('movies', null, null, {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: 'db/movies.sqlite'
});

/* --- Define Movie Model --- */

/* --- Define Actor Model --- */

/* --- Define Belongs-To-Many relations for Models --- */

//init tables or sync existing model
sequelize.sync({ force: false });

/* User-Application logic entry point */

/* --- get index "/" --- */

/* --- get manage page "/manage" --- */

/* --- post to "/addmovie" - render manage page --- */

/* --- post to "/addactor" - render manage page --- */

/* --- post to /assignactormovie - render manage page --- */


/* Init listener */
app.listen(process.env.PORT || 8080);
