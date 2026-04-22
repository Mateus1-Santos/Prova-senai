const consultasService = require('../services/consultas.service');

const listarConsultas = async (req, res) => {
  try {
    const consultas = await consultasService.listarTodasConsultas();
    res.json({ total: consultas.length, consultas });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar consultas', mensagem: error.message });
  }
};

const buscarConsultaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const consulta = await consultasService.buscarConsultaPorId(id);
    if (!consulta) {
      return res.status(404).json({ erro: 'Consulta não encontrada' });
    }
    res.json({ consulta });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar consulta', mensagem: error.message });
  }
};

const criarConsulta = async (req, res) => {
  try {
    const { animal_id, data_consulta, motivo, diagnostico, veterinario } = req.body;
    const novaConsulta = await consultasService.criarConsulta({ animal_id, data_consulta, motivo, diagnostico, veterinario });
    res.status(201).json({ mensagem: 'Consulta registrada com sucesso!', consulta: novaConsulta });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao registrar consulta', mensagem: error.message });
  }
};

const atualizarConsulta = async (req, res) => {
  try {
    const { id } = req.params;
    const { animal_id, data_consulta, motivo, diagnostico, veterinario } = req.body;
    const consultaAtualizada = await consultasService.atualizarConsulta(id, { animal_id, data_consulta, motivo, diagnostico, veterinario });
    if (!consultaAtualizada) {
      return res.status(404).json({ erro: 'Consulta não encontrada' });
    }
    res.json({ mensagem: 'Consulta atualizada com sucesso!', consulta: consultaAtualizada });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar consulta', mensagem: error.message });
  }
};

const deletarConsulta = async (req, res) => {
  try {
    const { id } = req.params;
    const consultaDeletada = await consultasService.deletarConsulta(id);
    if (!consultaDeletada) {
      return res.status(404).json({ erro: 'Consulta não encontrada' });
    }
    res.json({ mensagem: 'Consulta removida com sucesso!', consulta: consultaDeletada });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover consulta', mensagem: error.message });
  }
};

module.exports = {
  listarConsultas,
  buscarConsultaPorId,
  criarConsulta,
  atualizarConsulta,
  deletarConsulta,
};
