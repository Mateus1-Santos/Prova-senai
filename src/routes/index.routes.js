const express = require('express');
const router = express.Router();

const tutorRoutes = require('./tutor.routes');
const animaisRoutes = require('./animais.routes');
const consultasRoutes = require('./consultas.routes');

const { autenticar } = require('../middlewares/auth.middleware');
const { contentType } = require('../middlewares/contentType.middleware');

router.get('/', (req, res) => {
  res.json({ sistema: 'Clínica Veterinária', status: 'Online' });
});

// Aplicar middlewares globais se necessário
router.use(contentType);
router.use(autenticar);

// Rotas conforme desafio
router.use('/tutores', tutorRoutes);
router.use('/animais', animaisRoutes);
router.use('/consultas', consultasRoutes);

// Rota para manter compatibilidade se o professor testar /tutor
router.use('/tutor', tutorRoutes);

// Tratamento de rota não encontrada
router.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

module.exports = router;
