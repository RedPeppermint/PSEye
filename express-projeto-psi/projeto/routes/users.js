var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

router.get('/:id', usersController.user_get);

router.post('/', usersController.user_post);

router.delete('/:id', usersController.user_delete);

router.put('/:id', usersController.user_put);

module.exports = router;
