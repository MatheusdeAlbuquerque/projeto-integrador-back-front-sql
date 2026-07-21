// src/repositories/professorRepository.js

const pool = require("../database/pg");

const listarTodos = async () => {
  const resultado = await pool.query(`
    SELECT
      *
    FROM escola.professores
    ORDER BY nome
  `);

  return resultado.rows;
};

const buscarPorId = async (id) => {
  const resultado = await pool.query(
    `
      SELECT
        *
      FROM escola.professores
      WHERE id_professor = $1
    `,
    [id]
  );

  return resultado.rows[0] || null;
};

const criar = async (dados) => {
  const { nome, email, especialidade } = dados;

  const resultado = await pool.query(
    `
      INSERT INTO escola.professores (
        nome,
        email,
        especialidade
      )
      VALUES ($1, $2, $3)
      RETURNING
        id_professor,
        nome,
        email,
        especialidade
    `,
    [nome, email, especialidade]
  );

  return resultado.rows[0];
};

const atualizar = async (id, dados) => {
  const { nome, email, especialidade } = dados;

  const resultado = await pool.query(
    `
      UPDATE escola.professores
      SET
        nome = $1,
        email = $2,
        especialidade = $3
      WHERE id_professor = $4
      RETURNING
        id_professor,
        nome,
        email,
        especialidade
    `,
    [nome, email, especialidade, id]
  );

  return resultado.rows[0] || null;
};

const deletar = async (id) => {
  const resultado = await pool.query(
    `
      DELETE FROM escola.professores
      WHERE id_professor = $1
      RETURNING
        id_professor,
        nome,
        email,
        especialidade
    `,
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