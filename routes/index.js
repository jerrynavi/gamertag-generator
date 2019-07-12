const express = require('express');
const router = express.Router();

const util = require("../util");

/* GET home page. */
router.get('/', function(req, res, next) {
  const tag = util.getGamerTag();
  res.render('index', {
    title: 'Gamertag Generator',
    tag
  });
});

module.exports = router;
