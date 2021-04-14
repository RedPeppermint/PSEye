var express = require('express');
var router = express.Router();
var databaseController = require('../controllers/databaseController')

router.get('/init', databaseController.init);


module.exports = router;
