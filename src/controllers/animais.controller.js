const animaisService = require('../services/animais.service');

const listarAnimais = async (req, res) => {
  try {
    const animais = await animaisService.listarTodosAnimais();
    res.json({ total: animais.length, animais });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar animais', mensagem: error.message });
  }
};

const buscarAnimalPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await animaisService.buscarAnimalPorId(id);
    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' });
    }
    res.json({ animal });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar animal', mensagem: error.message });
  }
};

const criarAnimal = async (req, res) => {
  try {
    const { nome, especie, raca, data_nascimento, tutor_id } = req.body;
    const novoAnimal = await animaisService.criarAnimal({ nome, especie, raca, data_nascimento, tutor_id });
    res.status(201).json({ mensagem: 'Animal cadastrado com sucesso!', animal: novoAnimal });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao cadastrar animal', mensagem: error.message });
  }
};

const atualizarAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, especie, raca, data_nascimento, tutor_id } = req.body;
    const animalAtualizado = await animaisService.atualizarAnimal(id, { nome, especie, raca, data_nascimento, tutor_id });
    if (!animalAtualizado) {
      return res.status(404).json({ erro: 'Animal não encontrado' });
    }
    res.json({ mensagem: 'Animal atualizado com sucesso!', animal: animalAtualizado });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar animal', mensagem: error.message });
  }
};

const deletarAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const animalDeletado = await animaisService.deletarAnimal(id);
    if (!animalDeletado) {
      return res.status(404).json({ erro: 'Animal não encontrado' });
    }
    res.json({ mensagem: 'Animal removido com sucesso!', animal: animalDeletado });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover animal', mensagem: error.message });
  }
};

const listarConsultasPorAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const consultas = await animaisService.listarConsultasPorAnimal(id);
    res.json({ total: consultas.length, consultas });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar consultas do animal', mensagem: error.message });
  }
};

module.exports = { 
  listarAnimais, 
  buscarAnimalPorId, 
  criarAnimal, 
  atualizarAnimal, 
  deletarAnimal,
  listarConsultasPorAnimal
};
