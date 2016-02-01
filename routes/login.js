const router = new ( require( 'express' ).Router )();
const User = require( '../models/User' );
const token = require( '../lib/token' );
const mongoose = require( 'mongoose' );

const sendToken = ( token ) => String.raw`
	<script>
		window.localStorage.token='${token}';
		window.location.assign('/');
	</script>`;

router.get( '/facebook/callback', ( req, res, next ) => {

const profile = req.query;
const facebookId = profile.raw.user_id;

User.findOne( { facebookId } )
	.then( user => {
		if ( user ) return user;
		return new User({
			username: profile.raw.screen_name,
			facebookId,
			facebookProfile: profile
		}).save();
	})
	.then( user => {
		return token.sign( user );
	})
	// .then( token => res.json({ token }) )
	.then( token => {
		res.send( sendToken( token ) );
	})
	.catch( next );
});

module.exports = router;
