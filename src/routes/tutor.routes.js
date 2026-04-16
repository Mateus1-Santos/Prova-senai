const express = require('express');
const router = express.Router();
const tutoresController = require('../controllers/tutor.controller');

router.get('/', tutoresController.listarTutores);
router.get('/:id', tutoresController.buscarTutorPorId);
router.post('/', tutoresController.criarTutor);
router.put('/:id', tutoresController.atualizarTutor);


module.exports = router;
