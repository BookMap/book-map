const router = require('express').Router();
const User = require('../models/User');

//GET all users
router.get('/', (req, res, next) => {
  User.find({})
      .lean()
      .exec((err, users) => {
        if (err) {
          console.log(err);
          res.status(500).send(err[0]);
        }
        res.send(users);
      });
});

module.exports = router;
