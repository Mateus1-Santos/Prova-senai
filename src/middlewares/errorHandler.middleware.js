const errorHandler = (err, req, res, next) => {
  // Loga o erro completo no servidor (útil para debug)
  console.error(`[ERRO] ${req.method} ${req.url}:`, err.message);

  const status = err.status || 500;

  // NUNCA envie err.stack para o cliente em produção.
  res.status(status).json({
    erro: err.message || 'Erro interno na Clinica Mateus Motta',
    caminho: req.url,
  });
};

module.exports = errorHandler;
