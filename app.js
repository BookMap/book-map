var express = require('express');
var app = express();
var path = require('path');
var Grant = require('grant-express');
var grantConfig = require('./grant');
var grant = new Grant( grantConfig );
var token = require('./lib/token');
var search = require('./routes/search');
var login = require('./routes/login');
var publicPath = path.join( __dirname, 'public' );
var session = require( 'express-session' );
var sekrit = process.env.APP_SECRET;
var search = require('./routes/search');
var profile = require('./routes/profile');

app.use( session({
	secret: sekrit,
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false }
}));

app.use(grant);
app.use( express.static( publicPath ) );
app.use('/login', login);

function auth( req, res, next ) {
	token.verify( req.headers.token )
		.then( payload => {
      req.user_id = payload.user_id;
      next();
    })
		.catch( err => {
			res.status( 401 ).send( 'Not authorized' );
		});
}

app.use('/api/profile', auth, profile);
app.use('/api/search', search);
module.exports = app;
