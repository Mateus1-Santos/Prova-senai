const pool = require('../database/connection');

const listarTodosAnimais = async () => {
  const result = await pool.query('SELECT * FROM animais ORDER BY id ASC');
  return result.rows;
};

const buscarAnimalPorId = async (id) => {
  const result = await pool.query('SELECT * FROM animais WHERE id = $1', [id]);
  return result.rows[0] || null;
};

const criarAnimal = async ({ nome, especie, raca, data_nascimento, tutor_id }) => {
  if (!nome || !tutor_id) {
    throw new Error('Nome e tutor_id são obrigatórios.');
  }
  const result = await pool.query(
    'INSERT INTO animais (nome, especie, raca, data_nascimento, tutor_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nome, especie, raca, data_nascimento, tutor_id]
  );
  return result.rows[0];
};

const atualizarAnimal = async (id, { nome, especie, raca, data_nascimento, tutor_id }) => {
  const animalExistente = await buscarAnimalPorId(id);
  if (!animalExistente) {
    return null;
  }

  const result = await pool.query(
    'UPDATE animais SET nome = $1, especie = $2, raca = $3, data_nascimento = $4, tutor_id = $5 WHERE id = $6 RETURNING *',
    [
      nome ?? animalExistente.nome,
      especie ?? animalExistente.especie,
      raca ?? animalExistente.raca,
      data_nascimento ?? animalExistente.data_nascimento,
      tutor_id ?? animalExistente.tutor_id,
      id
    ]
  );

  return result.rows[0];
};

const deletarAnimal = async (id) => {
  const result = await pool.query('DELETE FROM animais WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] || null;
};

const listarConsultasPorAnimal = async (animalId) => {
  const query = `
    SELECT c.*, a.nome as animal_nome 
    FROM consultas c 
    JOIN animais a ON c.animal_id = a.id 
    WHERE a.id = $1
  `;
  const result = await pool.query(query, [animalId]);
  return result.rows;
};

module.exports = { 
  listarTodosAnimais, 
  buscarAnimalPorId, 
  criarAnimal, 
  atualizarAnimal, 
  deletarAnimal,
  listarConsultasPorAnimal
};
