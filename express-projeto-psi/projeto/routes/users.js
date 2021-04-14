var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');

router.get('/login', usersController.user_login);

router.get('/:id', usersController.user_get);

router.post('/', usersController.user_post);

router.delete('/:id', usersController.user_delete);

// router.put('/:id', usersController.user_put); se quisermos alterar password eh isto

module.exports = router;