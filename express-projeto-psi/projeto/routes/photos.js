var express = require('express');
var router = express.Router();
var photosController = require('../controllers/photosController')

router.get('/', photosController.photos_get);

router.get('/:id', photosController.photo_get);

router.post('/', photosController.photo_post);

router.delete('/:id', photosController.photo_delete);

router.put('/:id', photosController.photo_update);

module.exports = router;
