var isDev = process.env.NODE_ENV !== 'production';
module.exports = {
  "server": {
    "protocol": isDev ? "http" : "https",
    "host": isDev ? process.env.HOST + ':' + process.env.PORT : process.env.HOST
  },
  "facebook": {
    "key": process.env.APP_ID,
    "secret": process.env.APP_SECRET,
    "callback": "/login/facebook/callback",
    "scope": [
      "public_profile",
      "email"
    ]
  }
};
