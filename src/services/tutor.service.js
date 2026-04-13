const acervo = [
  {
    id: 1,
    nome: 'Jorge',
    cidade: 'Palhoça',
    disponivel: true,
  },
  {
    id: 2,
    nome: 'Daniel',
    cidade: 'São Jose',
    disponivel: false,
  },
  {
    id: 3,
    nome: "Ricardo",
    cidade: 'Floripa',
    disponivel: true,
  },
];

// Lista todos os livros do acervo
const listarTodosTutores = async () => {
  return acervo;
};

// Busca um livro específico pelo ID
const buscarTutorPorId = async (id) => {
  const livro = acervo.find((item) => item.id === Number(id));
  // Regra de negócio: se não existe, retorna null.
  // O Controller decide o que fazer com o null.
  return livro || null;
};

// Criar um novo livro no acervo
const criarTutor = async ({ titulo, autor }) => {
  // Regra de negócio: título e autor são obrigatórios
  if (!nome || !cidade) {
    throw new Error('Título e autor são obrigatórios.');
  }
  const novoTutor = {
    id: acervo.length + 1,
    nome,
    cidade,
    disponivel: true,
  };
  acervo.push(novoLivro);
  return novoLivro;
};

module.exports = { listarTodosTutores, buscarTutorPorId, criarTutor };
