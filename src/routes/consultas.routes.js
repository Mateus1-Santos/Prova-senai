const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultas.controller');

router.get('/', consultasController.listarConsultas);
router.post('/', consultasController.criarConsulta);
router.get('/:id', consultasController.buscarConsultaPorId);
router.put('/:id', consultasController.atualizarConsulta);
router.delete('/:id', consultasController.deletarConsulta);

module.exports = router;