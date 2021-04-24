var express = require('express');
var router = express.Router();
var databaseController = require('../controllers/databaseController')

router.get('/init/users', databaseController.initUsers);
router.get('/init/photos', databaseController.initPhotos);

module.exports = router;
