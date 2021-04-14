var express = require('express');
var router = express.Router();
var photosController = require('../controllers/photosController')


router.get('/:id', photosController.photo_get);

router.post('/', photosController.photo_post);

router.delete('/:id', photosController.photo_delete);

module.exports = router;
