const tutorService = require('../services/tutor.service');

const listarTutores = async (req, res) => {
  try {
    const tutores = await tutorService.listarTodosTutores();
    res.json({ total: tutores.length, tutores });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar tutores', mensagem: error.message });
  }
};

const buscarTutorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tutor = await tutorService.buscarTutorPorId(id);
    if (!tutor) {
      return res.status(404).json({ erro: 'Tutor não encontrado' });
    }
    res.json({ tutor });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar tutor', mensagem: error.message });
  }
};

const criarTutor = async (req, res) => {
  try {
    const { nome, telefone, email } = req.body;
    const novoTutor = await tutorService.criarTutor({ nome, telefone, email });
    res.status(201).json({ mensagem: 'Tutor cadastrado com sucesso!', tutor: novoTutor });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao cadastrar tutor', mensagem: error.message });
  }
};

const atualizarTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, email } = req.body;
    const tutorAtualizado = await tutorService.atualizarTutor(id, { nome, telefone, email });
    if (!tutorAtualizado) {
      return res.status(404).json({ erro: 'Tutor não encontrado' });
    }
    res.json({ mensagem: 'Tutor atualizado com sucesso!', tutor: tutorAtualizado });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar tutor', mensagem: error.message });
  }
};

const deletarTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const tutorDeletado = await tutorService.deletarTutor(id);
    if (!tutorDeletado) {
      return res.status(404).json({ erro: 'Tutor não encontrado' });
    }
    res.json({ mensagem: 'Tutor removido com sucesso!', tutor: tutorDeletado });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover tutor', mensagem: error.message });
  }
};

module.exports = { 
  listarTutores, 
  buscarTutorPorId, 
  criarTutor, 
  atualizarTutor, 
  deletarTutor 
};
