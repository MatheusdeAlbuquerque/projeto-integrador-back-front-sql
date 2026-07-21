// src/repositories/disciplinaRepository.js

const pool = require("../database/pg");

const listarTodos = async () => {
  const resultado = await pool.query(`
    SELECT
      id_disciplina,
      nome,
      carga_horaria
    FROM escola.disciplinas
    ORDER BY nome
  `);

  return resultado.rows;
};

const buscarPorId = async (id) => {
  const resultado = await pool.query(
    `
      SELECT
        id_disciplina,
        nome,
        carga_horaria
      FROM escola.disciplinas
      WHERE id_disciplina = $1
    `,
    [id]
  );

  return resultado.rows[0] || null;
};

const criar = async (dados) => {
  const { nome, carga_horaria } = dados;

  const resultado = await pool.query(
    `
      INSERT INTO escola.disciplinas (
        nome,
        carga_horaria
      )
      VALUES ($1, $2)
      RETURNING
        id_disciplina,
        nome,
        carga_horaria
    `,
    [nome, carga_horaria]
  );

  return resultado.rows[0];
};

const atualizar = async (id, dados) => {
  const { nome, carga_horaria } = dados;

  const resultado = await pool.query(
    `
      UPDATE escola.disciplinas
      SET
        nome = $1,
        carga_horaria = $2
      WHERE id_disciplina = $3
      RETURNING
        id_disciplina,
        nome,
        carga_horaria
    `,
    [nome, carga_horaria, id]
  );

  return resultado.rows[0] || null;
};

const deletar = async (id) => {
  const resultado = await pool.query(
    `
      DELETE FROM escola.disciplinas
      WHERE id_disciplina = $1
      RETURNING
        id_disciplina,
        nome,
        carga_horaria
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