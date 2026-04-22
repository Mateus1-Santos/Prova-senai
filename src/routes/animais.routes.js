const express = require('express');
const router = express.Router();
const animaisController = require('../controllers/animais.controller');

router.get('/', animaisController.listarAnimais);
router.get('/:id', animaisController.buscarAnimalPorId);
router.post('/', animaisController.criarAnimal);
router.put('/:id', animaisController.atualizarAnimal);
router.delete('/:id', animaisController.deletarAnimal);

// Rota complementar: GET /animais/:id/consultas
router.get('/:id/consultas', animaisController.listarConsultasPorAnimal);

module.exports = router;
