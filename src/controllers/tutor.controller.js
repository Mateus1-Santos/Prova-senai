const tutorService = require('../services/tutor.service');

const listarTutores = async (req, res) => {
  try {
    const tutores = await tutorService.listarTodosTutores();
    res.status(200).json({ total: tutores.length, tutores });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar tutores.' });
  }
};

const buscarTutorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tutor = await tutorService.buscarTutorPorId(id);

    if (!tutor) {
      return res
        .status(404)
        .json({ erro: `Tutor ${id} não encontrado no acervo.` });
    }

    res.status(200).json({ tutor });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar por um tutor.' });
  }
};

const criarTutor= async (req, res) => {
  try {
    const { nome, cidade } = req.body;
    const novoTutor = await tutorService.criarTutor({ nome, cidade });

    res.status(201).json({
      mensagem: 'Tutor cadastrado no acervo com sucesso!',
      tutor: novoTutor,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};
const atualizarTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cidade } = req.body;
    const tutorAtualizado = await tutorService.atualizarTutor(id, {
      nome,
      cidade,
    });

    if (!tutorAtualizado) {
      return res.status(404).json({ erro: `Tutor ${id} não encontrado.` });
    }

    res.status(200).json({
      mensagem: 'Tutor atualizado com sucesso!',
      tutor: tutorAtualizado,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

module.exports = { listarTutores, buscarTutorPorId, criarTutor, atualizarTutor  };
