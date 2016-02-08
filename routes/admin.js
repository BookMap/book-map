const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.admin) {
    res.send('success');
  } else {
    res.status(401).send('unauthorized');
  }
});

module.exports = router;
