var express = require('express');
var router = express.Router();

var photo_controller = require('../controller/photo_controller');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload/', photo_controller.upload);

module.exports = router;
