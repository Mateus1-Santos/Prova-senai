const pool = require('../database/connection');

const listarTodasConsultas = async () => {
  const result = await pool.query('SELECT * FROM consultas ORDER BY data_consulta DESC');
  return result.rows;
};

const buscarConsultaPorId = async (id) => {
  const result = await pool.query('SELECT * FROM consultas WHERE id = $1', [id]);
  return result.rows[0] || null;
};

const criarConsulta = async ({ animal_id, data_consulta, motivo, diagnostico, veterinario }) => {
  if (!animal_id || !data_consulta) {
    throw new Error('animal_id e data_consulta são obrigatórios.');
  }
  const result = await pool.query(
    'INSERT INTO consultas (animal_id, data_consulta, motivo, diagnostico, veterinario) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [animal_id, data_consulta, motivo, diagnostico, veterinario]
  );
  return result.rows[0];
};

const atualizarConsulta = async (id, { animal_id, data_consulta, motivo, diagnostico, veterinario }) => {
  const consultaExistente = await buscarConsultaPorId(id);
  if (!consultaExistente) {
    return null;
  }

  const result = await pool.query(
    'UPDATE consultas SET animal_id = $1, data_consulta = $2, motivo = $3, diagnostico = $4, veterinario = $5 WHERE id = $6 RETURNING *',
    [
      animal_id ?? consultaExistente.animal_id,
      data_consulta ?? consultaExistente.data_consulta,
      motivo ?? consultaExistente.motivo,
      diagnostico ?? consultaExistente.diagnostico,
      veterinario ?? consultaExistente.veterinario,
      id
    ]
  );

  return result.rows[0];
};

const deletarConsulta = async (id) => {
  const result = await pool.query('DELETE FROM consultas WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] || null;
};

module.exports = {
  listarTodasConsultas,
  buscarConsultaPorId,
  criarConsulta,
  atualizarConsulta,
  deletarConsulta,
};
