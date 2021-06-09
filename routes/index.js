const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  let rawdata = fs.readFileSync('./public/json/config.json');
  let config = JSON.parse(rawdata);
  res.render('index', config );
});

module.exports = router;
