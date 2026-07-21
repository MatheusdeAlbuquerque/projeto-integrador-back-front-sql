// src/repositories/notaRepository.js

const pool = require("../database/pg");

const listarTodos = async () => {
  const resultado = await pool.query(`
    SELECT
      n.id_nota,
      n.id_matricula,
      n.nota,
      a.id_aluno,
      a.nome AS aluno,
      t.id_turma,
      t.nome AS turma,
      d.nome AS disciplina
    FROM escola.notas AS n
    INNER JOIN escola.matriculas AS m
      ON m.id_matricula = n.id_matricula
    INNER JOIN escola.alunos AS a
      ON a.id_aluno = m.id_aluno
    INNER JOIN escola.turmas AS t
      ON t.id_turma = m.id_turma
    INNER JOIN escola.disciplinas AS d
      ON d.id_disciplina = t.id_disciplina
    ORDER BY a.nome
  `);

  return resultado.rows;
};

const buscarPorId = async (id) => {
  const resultado = await pool.query(
    `
      SELECT
        n.id_nota,
        n.id_matricula,
        n.nota,
        a.id_aluno,
        a.nome AS aluno,
        t.id_turma,
        t.nome AS turma,
        d.nome AS disciplina
      FROM escola.notas AS n
      INNER JOIN escola.matriculas AS m
        ON m.id_matricula = n.id_matricula
      INNER JOIN escola.alunos AS a
        ON a.id_aluno = m.id_aluno
      INNER JOIN escola.turmas AS t
        ON t.id_turma = m.id_turma
      INNER JOIN escola.disciplinas AS d
        ON d.id_disciplina = t.id_disciplina
      WHERE n.id_nota = $1
    `,
    [id]
  );

  return resultado.rows[0] || null;
};

const listarPorMatricula = async (idMatricula) => {
  const resultado = await pool.query(
    `
      SELECT
        id_nota,
        id_matricula,
        nota
      FROM escola.notas
      WHERE id_matricula = $1
      ORDER BY id_nota
    `,
    [idMatricula]
  );

  return resultado.rows;
};

const criar = async (dados) => {
  const { id_matricula, nota } = dados;

  const resultado = await pool.query(
    `
      INSERT INTO escola.notas (
        id_matricula,
        nota
      )
      VALUES ($1, $2)
      RETURNING
        id_nota,
        id_matricula,
        nota
    `,
    [id_matricula, nota]
  );

  return resultado.rows[0];
};

const atualizar = async (id, dados) => {
  const { id_matricula, nota } = dados;

  const resultado = await pool.query(
    `
      UPDATE escola.notas
      SET
        id_matricula = $1,
        nota = $2
      WHERE id_nota = $3
      RETURNING
        id_nota,
        id_matricula,
        nota
    `,
    [id_matricula, nota, id]
  );

  return resultado.rows[0] || null;
};

const deletar = async (id) => {
  const resultado = await pool.query(
    `
      DELETE FROM escola.notas
      WHERE id_nota = $1
      RETURNING
        id_nota,
        id_matricula,
        nota
    `,
    [id]
  );

  return resultado.rows[0] || null;
};

module.exports = {
  listarTodos,
  buscarPorId,
  listarPorMatricula,
  criar,
  atualizar,
  deletar,
};