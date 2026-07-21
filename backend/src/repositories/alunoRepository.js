// esse código é para o src/repositories/alunoRepository.js
const pool = require("../database/pg");

const listarTodos = async () => {
  const resultado = await pool.query(
    "SELECT * FROM alunos ORDER BY nome"
  );
  return resultado.rows;
};

const buscarPorId = async (id) => {
  const resultado = await pool.query(
    "SELECT * FROM alunos WHERE id = $1",
    [id]
  );
  return resultado.rows[0] || null;
};

const criar = async (dados) => {
  const { nome, email, matricula, data_nascimento } = dados;

  const resultado = await pool.query(
    `INSERT INTO alunos (nome, email, matricula, data_nascimento)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nome, email, matricula, data_nascimento]
  );

  return resultado.rows[0];
};

const atualizar = async (id, dados) => {
  const { nome, email, data_nascimento } = dados;

  const resultado = await pool.query(
    `UPDATE alunos
     SET nome = $1, email = $2, data_nascimento = $3
     WHERE id = $4
     RETURNING *`,
    [nome, email, data_nascimento, id]
  );

  return resultado.rows[0] || null;
};

const deletar = async (id) => {
  const resultado = await pool.query(
    "DELETE FROM alunos WHERE id = $1 RETURNING *",
    [id]
  );

  return resultado.rows[0] || null;
};

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
};