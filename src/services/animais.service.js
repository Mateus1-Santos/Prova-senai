const animais = [
  {
    id: 1,
    nome: 'Anderson Dutra',
    raça: 'aura mais ego',
  },
  {
    id: 2,
    nome: 'Daniel',
    raça: 'X-tudo',
  },
  {
    id: 3,
    nome: 'Teddy',
    raça: 'pitbull',
  },
];

const listarTodosAnimais = async () => {
  return animais;
};

const buscarAnimalPorId = async (id) => {
  const animal = animais.find((item) => item.id === Number(id));
  return animal || null;
};

// Criar um novo usuario
const criarAnimal = async ({ nome, raça }) => {
  if (!nome || !raça) {
    throw new Error('Nome e raça são obrigatórios.');
  }
  const novoAnimal = {
    id: animais.length + 1,
    nome,
    raça,
  };
  animais.push(novoAnimal);
  return novoAnimal;
};
const atualizarAnimal = async (id, { nome, raca }) => {
  const index = animais.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return null;
  }

  if (!nome && !raca) {
    throw new Error('Nome ou raça devem ser informados para atualizar.');
  }

  animais[index] = {
    ...animais[index],
    nome: nome ?? animais[index].nome,
    raca: raca ?? animais[index].raca,
  };

  return animais[index];
};
module.exports = { listarTodosAnimais, buscarAnimalPorId, criarAnimal, atualizarAnimal};
