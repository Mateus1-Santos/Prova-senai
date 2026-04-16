const express = require('express');
const router = express.Router();
const tutorRoutes = require('./tutor.routes');
const animaisRoutes = require('./animais.routes');
const consultasRoutes = require('./consultas.routes');
const autenticar = require('../middlewares/auth.middleware')
const contentType = require('../middlewares/contentType.middleware')


// 2. Rota Raiz
router.get('/', (req, res) => {
  res.json({ sistema: 'clinica Mateus Motta', status: 'Online' });
});


router.use(autenticar);
router.use(contentType)


//rota de recursos 
router.use('/tutor', tutorRoutes);
router.use('/animais', animaisRoutes);
router.use('/consultas', consultasRoutes);


//rota 404
router.use((req, res) => {
  res.status(404).json({erro: 'Rota não encontrada na clinica Mateus Motta'})
})


module.exports = router;
