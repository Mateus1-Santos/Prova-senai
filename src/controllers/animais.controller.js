const animalService = require('../services/animais.service');

const listarAnimais = async (req, res) => {
  try {
    const animais = await animalService.listarTodosAnimais();
    res.status(200).json({ total: animais.length, animais });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao listar animais.' });
  }
};

const buscarAnimalPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await animalService.buscarAnimalPorId(id);

    if (!animal) {
      return res.status(404).json({ erro: `Animal ${id} não encontrado.` });
    }

    res.status(200).json({ animal });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro interno ao buscar usuário.' });
  }
};

const criarAnimal = async (req, res) => {
  try {
    const { nome, raca } = req.body;
    const novoAnimal = await animalService.criarAnimal({ nome, raca });

    res.status(201).json({
      mensagem: 'Animal cadastrado com sucesso!',
      animal: novoAnimal,
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};
const atualizarAnimal = async (id, { titulo, autor }) => {
  const index = animais.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return null;
  }

  if (!titulo && !autor) {
    throw new Error('Título ou autor devem ser informados para atualizar.');
  }

  animais[index] = {
    ...animais[index],
    titulo: titulo ?? animais[index].titulo,
    autor: autor ?? animais[index].autor,
  };

  return animais[index];
};
module.exports = { listarAnimais, buscarAnimalPorId, criarAnimal, atualizarAnimal};
