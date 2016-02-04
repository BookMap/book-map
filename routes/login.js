const router = new ( require( 'express' ).Router )();
const User = require( '../models/User' );
const token = require( '../lib/token' );
const mongoose = require( 'mongoose' );
const request = require('request');

const sendToken = ( token ) => String.raw`
	<script>
		window.localStorage.token='${token}';
		window.location.assign('/#/home');
	</script>`;

router.get( '/facebook/callback', ( req, res, next ) => {
	if (req.query.error) {
		return next(req.query.err);
	}
  var fbtoken = req.query.access_token;

  request('https://graph.facebook.com/me?fields=email,name&access_token=' + fbtoken, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      var _id = info.id;

      User.findById(_id)
      	.then( user => {
      		if ( user ) return user;
      		return new User({
      			username: info.name,
      			_id,
      			email: info.email
      		}).save();
      	})
      	.then( user => {
      		return token.sign( user );
      	})
      	.then( token => {
      		res.send( sendToken( token ) );
      	})
      	.catch( next );
    }
  });
});

module.exports = router;
