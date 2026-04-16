const consultaService = require('../services/consultas.service');

const listarConsultas = async (req, res) => {
  try {
    const consultas = await consultaService.listarTodasConsultas();
    res.status(200).json({ total: consultas.length, consultas });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar consultas.' });
  }
};

const buscarConsultaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const consulta = await consultaService.buscarConsultaPorId(id);

    if (!consulta) {
      return res.status(404).json({ erro: `Consulta ${id} não encontrada.` });
    }

    res.status(200).json({ consulta });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar consulta.' });
  }
};

const criarConsulta = async (req, res) => {
  try {
    const { data, descricao, tutor_id, animal_id } = req.body;
    const novaConsulta = await consultaService.criarConsulta({ data, descricao, tutor_id, animal_id });

    res.status(201).json({
      mensagem: 'Consulta cadastrada com sucesso!',
      consulta: novaConsulta,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

const atualizarConsulta = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, descricao, tutor_id, animal_id } = req.body;
    const consultaAtualizada = await consultaService.atualizarConsulta(id, { data, descricao, tutor_id, animal_id });

    if (!consultaAtualizada) {
      return res.status(404).json({ erro: `Consulta ${id} não encontrada.` });
    }

    res.status(200).json({
      mensagem: 'Consulta atualizada com sucesso!',
      consulta: consultaAtualizada,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

const deletarConsulta = async (req, res) => {
  try {
    const { id } = req.params;
    const consultaDeletada = await consultaService.deletarConsulta(id);

    if (!consultaDeletada) {
      return res.status(404).json({ erro: `Consulta ${id} não encontrada.` });
    }

    res.status(200).json({
      mensagem: 'Consulta deletada com sucesso!',
      consulta: consultaDeletada,
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao deletar consulta.' });
  }
};

module.exports = {
  listarConsultas,
  buscarConsultaPorId,
  criarConsulta,
  atualizarConsulta,
  deletarConsulta,
};
