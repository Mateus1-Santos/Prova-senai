const express = require('express');
const router = express.Router();
const animaisController = require('../controllers/animais.controller')

router.get('/', animaisController.listarAnimais);
router.post('/', animaisController.criarAnimal);
router.put('/:id', animaisController.atualizarAnimal);

module.exports = router;
