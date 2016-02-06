var express = require('express');
var app = express();
var path = require('path');
var Grant = require('grant-express');
var grantConfig = require('./grant');
var grant = new Grant( grantConfig );
var token = require('./lib/token');
var login = require('./routes/login');
var publicPath = path.join( __dirname, 'public' );
var session = require( 'express-session' );
var sekrit = process.env.APP_SECRET;
var books = require('./routes/books');
var titles = require('./routes/titles');
var users = require('./routes/users');
var profile = require('./routes/profile');
var admin = require('./routes/admin');
var bodyParser = require('body-parser');

app.use( session({
	secret: sekrit,
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(grant);
app.use( express.static( publicPath ) );
app.use('/login', login);

function auth( req, res, next ) {
	token.verify( req.headers.token )
		.then( payload => {
      		req.user_id = payload.user_id;
					if (payload.admin) {
						req.admin = true;
					}
      		next();
    	})
		.catch( err => {
			res.status( 401 ).send( 'Not authorized' );
		});
}

app.use('/api/profile', auth, profile);
app.use('/api/books', books);
app.use('/api/titles',titles);
app.use('/api/users', users);
app.use('/api/admin', auth, admin);
app.use(function(err, req, res, next) {
  res.status(500).send(err);
});
app.use(function(req, res, next) {
  res.status(404).send('404, no page found: ' + req.url);
});


module.exports = app;
