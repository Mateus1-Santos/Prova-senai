const pool = require('../database/connection');

const listarTodosTutores = async () => {
  const result = await pool.query('SELECT * FROM tutores ORDER BY id ASC');
  return result.rows;
};

const buscarTutorPorId = async (id) => {
  const result = await pool.query('SELECT * FROM tutores WHERE id = $1', [id]);
  return result.rows[0] || null;
};

const criarTutor = async ({ nome, telefone, email }) => {
  if (!nome) {
    throw new Error('Nome é obrigatório.');
  }
  const result = await pool.query(
    'INSERT INTO tutores (nome, telefone, email) VALUES ($1, $2, $3) RETURNING *',
    [nome, telefone, email]
  );
  return result.rows[0];
};

const atualizarTutor = async (id, { nome, telefone, email }) => {
  const tutorExistente = await buscarTutorPorId(id);
  if (!tutorExistente) {
    return null;
  }

  const result = await pool.query(
    'UPDATE tutores SET nome = $1, telefone = $2, email = $3 WHERE id = $4 RETURNING *',
    [
      nome ?? tutorExistente.nome,
      telefone ?? tutorExistente.telefone,
      email ?? tutorExistente.email,
      id
    ]
  );

  return result.rows[0];
};

const deletarTutor = async (id) => {
  const result = await pool.query('DELETE FROM tutores WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] || null;
};

module.exports = { 
  listarTodosTutores, 
  buscarTutorPorId, 
  criarTutor, 
  atualizarTutor, 
  deletarTutor 
};
