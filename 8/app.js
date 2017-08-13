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
const Movie = sequelize.define('movies', {
	title:  Sequelize.STRING,
	genre:  Sequelize.STRING,
	year:   Sequelize.DATE,
	rating: Sequelize.INTEGER
});

const movie = Movie
	  .build({
		  title: 'Matrix',
		  genre: 'Action',
		  year: new Date(1999, 3, 2),
		  rating: 9
	  });

/* --- Define Actor Model --- */
const Actor = sequelize.define('actors', {
	firstName: Sequelize.STRING,
	lastName: Sequelize.STRING
});

const actors = Actor
	  .build({
		  id: 0,
		  firstName: 'Keanu',
		  lastName: 'Reeves',
	  });
console.log(actors);
/* --- Define Belongs-To-Many relations for Models --- */
// const movieActor = sequelize.define('movieActor', {
// 	title:  Sequelize.STRING,
// 	genre:  Sequelize.STRING,
// 	year:   Sequelize.DATE,
// 	rating: Sequelize.INTEGER,
// 	actors: {
// 		firstName: Sequelize.STRING,
// 		lastName: Sequelize.STRING
// 	}
// });

// const movieActors = movieActor
// 	  .build({
// 		  title: 'Matrix',
// 		  genre: 'Action',
// 		  year: new Date(1999, 3, 2),
// 		  rating: 9,
// 		  actors: {
// 			  firstName: actors.firstName,
// 			  lastName: actors.lastName
// 		  }
// 	  });

//Movie.belongsToMany(Actor, {through: 'movieActors', otherKey: 'lastName'});
//Actor.belongsToMany(Movie, {through: 'movieActors'});

//init tables or sync existing model
sequelize.sync({ force: false });

app.get('/', function(req, res){
    Movie
        .findAll()
        .then(result => {
            return result;
        })
        .then(function(a) {
            var tmp_forward = [];
            tmp_forward[0] = a;
            Actor
                .findAll()
                .then(resultActor => {
                    tmp_forward[1] = resultActor;
                    return tmp_forward;
                })
                .then(function(tmp_forward) {
                    res.render('index.jade', {
                        "movies": tmp_forward[0],
                        "actors": tmp_forward[1]
                    })
                });
        })

});

/* --- get manage page "/manage" --- */
app.get('/manage', function(req, res){
    res.render('manage.jade', {
		"movies": movie,
		"actors": actors
	});
});

/* --- post to "/addmovie" - render manage page --- */
app.post('/addmovie', function(req, res){
	var title = req.body.title;
	var genre = req.body.genre;
	var year  = req.body.year;

    res.render('manage.jade', {
		"movies": movie,
		"actors": actors
	});
});

/* --- post to "/addactor" - render manage page --- */
app.post('/addactor', function(req, res){
	var firstName = req.body.firstname;
	var lastName = req.body.lastname;

    res.render('manage.jade', {
		"movies": movie,
		"actors": actors
	});
});


/* --- post to /assignactormovie - render manage page --- */
app.post('/assignactormovie', function(req, res){
	var actorid = req.body.actorid;
	var movieid = req.body.movieid;

    res.render('manage.jade', {
		"movies": movie,
		"actors": actors
	});
});

/* Init listener */
app.listen(process.env.PORT || 8080);
