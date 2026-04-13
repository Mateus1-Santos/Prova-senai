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

const buscarAnimaisPorId = async (id) => {
  const animal = animais.find((item) => item.id === Number(id));
  return animal || null;
};

// Criar um novo usuario
const criarUsuario = async ({ nome, raça }) => {
  if (!nome || !raça) {
    throw new Error('Nome e raça são obrigatórios.');
  }
  const novoAnimal = {
    id: usuarios.length + 1,
    nome,
    raça,
  };
  animais.push(novoAnimal);
  return novoAnimal;
};

module.exports = { listarTodosAnimais, buscarAnimalPorId, criarAnimal};
