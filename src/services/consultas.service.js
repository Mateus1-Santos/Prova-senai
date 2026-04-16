const consultas = [
  {
    id: 1,
    data: '2023-10-01',
    descricao: 'Consulta de rotina',
    tutor_id: 1,
    animal_id: 1,
  },
  {
    id: 2,
    data: '2023-10-05',
    descricao: 'Vacinação',
    tutor_id: 2,
    animal_id: 2,
  },
];

const listarTodasConsultas = async () => {
  return consultas;
};

const buscarConsultaPorId = async (id) => {
  const consulta = consultas.find((item) => item.id === Number(id));
  return consulta || null;
};

const criarConsulta = async ({ data, descricao, tutor_id, animal_id }) => {
  if (!data || !descricao || !tutor_id || !animal_id) {
    throw new Error('Data, descrição, tutor_id e animal_id são obrigatórios.');
  }
  const novaConsulta = {
    id: consultas.length + 1,
    data,
    descricao,
    tutor_id,
    animal_id,
  };
  consultas.push(novaConsulta);
  return novaConsulta;
};

const atualizarConsulta = async (id, { data, descricao, tutor_id, animal_id }) => {
  const index = consultas.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return null;
  }

  if (!data && !descricao && !tutor_id && !animal_id) {
    throw new Error('Pelo menos um campo deve ser informado para atualizar.');
  }

  if (data) consultas[index].data = data;
  if (descricao) consultas[index].descricao = descricao;
  if (tutor_id) consultas[index].tutor_id = tutor_id;
  if (animal_id) consultas[index].animal_id = animal_id;

  return consultas[index];
};

const deletarConsulta = async (id) => {
  const index = consultas.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return null;
  }

  const consultaDeletada = consultas.splice(index, 1);
  return consultaDeletada[0];
};

module.exports = {
  listarTodasConsultas,
  buscarConsultaPorId,
  criarConsulta,
  atualizarConsulta,
  deletarConsulta,
};