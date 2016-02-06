const router = require('express').Router();
const User = require('../models/User');

//GET all users
router.get('/', (req, res, next) => {
  User.find({})
      .lean()
      .exec((err, users) => {
        if (err) {
          res.status(500).send(err[0]);
        }
        res.send(users);
      });
});

router.get('/:userid', (req, res, next) => {

    User.findById( req.params.userid )
        .lean()
        .exec((err, users) => {
            if (err) {
                res.status(500).send(err[0]);
            }
            res.send(users);
        });
});


module.exports = router;
