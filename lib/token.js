const jwt = require( 'jsonwebtoken' );
const sekrit = process.env.APP_SECRET;

module.exports = {
	sign ( user ) {
		return new Promise( ( resolve, reject ) => {
			jwt.sign( { userId: user._id  }, sekrit, null, resolve );
		});
	},

	verify ( token ) {
		return new Promise( ( resolve, reject ) => {
			jwt.verify( token, sekrit, ( err, payload ) => {
				if ( err ) return reject( err );
				resolve( payload );
			});
		});
	}
};
