// src/repositories/turmaRepository.js

const pool = require("../database/pg");

const listarTodos = async () => {
  const resultado = await pool.query(`
    SELECT
      t.id_turma,
      t.nome,
      t.id_disciplina,
      d.nome AS disciplina,
      t.id_professor,
      p.nome AS professor
    FROM escola.turmas AS t
    INNER JOIN escola.disciplinas AS d
      ON d.id_disciplina = t.id_disciplina
    INNER JOIN escola.professores AS p
      ON p.id_professor = t.id_professor
    ORDER BY t.nome
  `);

  return resultado.rows;
};

const buscarPorId = async (id) => {
  const resultado = await pool.query(
    `
      SELECT
        t.id_turma,
        t.nome,
        t.id_disciplina,
        d.nome AS disciplina,
        t.id_professor,
        p.nome AS professor
      FROM escola.turmas AS t
      INNER JOIN escola.disciplinas AS d
        ON d.id_disciplina = t.id_disciplina
      INNER JOIN escola.professores AS p
        ON p.id_professor = t.id_professor
      WHERE t.id_turma = $1
    `,
    [id]
  );

  return resultado.rows[0] || null;
};

const criar = async (dados) => {
  const { nome, id_disciplina, id_professor } = dados;

  const resultado = await pool.query(
    `
      INSERT INTO escola.turmas (
        nome,
        id_disciplina,
        id_professor
      )
      VALUES ($1, $2, $3)
      RETURNING
        id_turma,
        nome,
        id_disciplina,
        id_professor
    `,
    [nome, id_disciplina, id_professor]
  );

  return resultado.rows[0];
};

const atualizar = async (id, dados) => {
  const { nome, id_disciplina, id_professor } = dados;

  const resultado = await pool.query(
    `
      UPDATE escola.turmas
      SET
        nome = $1,
        id_disciplina = $2,
        id_professor = $3
      WHERE id_turma = $4
      RETURNING
        id_turma,
        nome,
        id_disciplina,
        id_professor
    `,
    [nome, id_disciplina, id_professor, id]
  );

  return resultado.rows[0] || null;
};

const deletar = async (id) => {
  const resultado = await pool.query(
    `
      DELETE FROM escola.turmas
      WHERE id_turma = $1
      RETURNING
        id_turma,
        nome,
        id_disciplina,
        id_professor
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