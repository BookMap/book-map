module.exports = {
  "server": {
    "protocol": "http",
    "host": process.env.HOST + ':' + process.env.PORT
  },
  "facebook": {
    "key": process.env.APP_ID,
    "secret": process.env.APP_SECRET,
    "callback": "/login/facebook/callback"
    // "scope": [
    //   "user_groups",
    //   "user_likes"
    // ]
  }
};
