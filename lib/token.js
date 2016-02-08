const jwt = require( 'jsonwebtoken' );
const secret = process.env.APP_SECRET;

module.exports = {
	sign ( user ) {
		return new Promise( ( resolve, reject ) => {
			jwt.sign( { user_id: user._id, admin: user.admin  }, secret, null, resolve );
		});
	},

	verify ( token ) {
		return new Promise( ( resolve, reject ) => {
			jwt.verify( token, secret, ( err, payload ) => {
				if ( err ) return reject( err );
				resolve( payload );
			});
		});
	}
};
