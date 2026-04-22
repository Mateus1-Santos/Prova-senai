const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutor.controller');

router.get('/', tutorController.listarTutores);
router.get('/:id', tutorController.buscarTutorPorId);
router.post('/', tutorController.criarTutor);
router.put('/:id', tutorController.atualizarTutor);
router.delete('/:id', tutorController.deletarTutor);

module.exports = router;
