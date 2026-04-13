const express = require('express');
const router = express.Router();
const animaisController = require('../controllers/animais.controller').default;

router.get('/', animaisController.listarAnimais);
router.post('/', animaisController.criarAnimal);

module.exports = router;
