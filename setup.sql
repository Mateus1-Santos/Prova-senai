-- Script de criação das tabelas para a Clínica Veterinária

CREATE TABLE IF NOT EXISTS tutores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS animais (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especie VARCHAR(50),
  raca VARCHAR(50),
  data_nascimento DATE,
  tutor_id INTEGER REFERENCES tutores(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS consultas (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER REFERENCES animais(id) ON DELETE CASCADE,
  data_consulta TIMESTAMP NOT NULL,
  motivo TEXT,
  diagnostico TEXT,
  veterinario VARCHAR(100)
);
