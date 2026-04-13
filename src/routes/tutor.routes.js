const express = require('express');
const router = express.Router();
const tutoresController = require('../controllers/tutor.controller');

router.get('/', tutoresController.listarTutores);
router.get('/:id', tutoresController.buscarTutorPorId);
router.post('/', tutoresController.criarTutor);

module.exports = router;
