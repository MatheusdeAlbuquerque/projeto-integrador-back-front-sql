// src/repositories/matriculaRepository.js

const pool = require("../database/pg");

const listarTodos = async () => {
  const resultado = await pool.query(`
    SELECT
      m.id_matricula,
      m.id_aluno,
      a.nome AS aluno,
      a.matricula AS numero_matricula_aluno,
      m.id_turma,
      t.nome AS turma,
      d.nome AS disciplina
    FROM escola.matriculas AS m
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
        m.id_matricula,
        m.id_aluno,
        a.nome AS aluno,
        a.matricula AS numero_matricula_aluno,
        m.id_turma,
        t.nome AS turma,
        d.nome AS disciplina
      FROM escola.matriculas AS m
      INNER JOIN escola.alunos AS a
        ON a.id_aluno = m.id_aluno
      INNER JOIN escola.turmas AS t
        ON t.id_turma = m.id_turma
      INNER JOIN escola.disciplinas AS d
        ON d.id_disciplina = t.id_disciplina
      WHERE m.id_matricula = $1
    `,
    [id]
  );

  return resultado.rows[0] || null;
};

const listarPorAluno = async (idAluno) => {
  const resultado = await pool.query(
    `
      SELECT
        m.id_matricula,
        m.id_aluno,
        a.nome AS aluno,
        m.id_turma,
        t.nome AS turma,
        d.nome AS disciplina
      FROM escola.matriculas AS m
      INNER JOIN escola.alunos AS a
        ON a.id_aluno = m.id_aluno
      INNER JOIN escola.turmas AS t
        ON t.id_turma = m.id_turma
      INNER JOIN escola.disciplinas AS d
        ON d.id_disciplina = t.id_disciplina
      WHERE m.id_aluno = $1
      ORDER BY d.nome
    `,
    [idAluno]
  );

  return resultado.rows;
};

const listarPorTurma = async (idTurma) => {
  const resultado = await pool.query(
    `
      SELECT
        m.id_matricula,
        m.id_aluno,
        a.nome AS aluno,
        a.email,
        a.matricula AS numero_matricula_aluno,
        m.id_turma
      FROM escola.matriculas AS m
      INNER JOIN escola.alunos AS a
        ON a.id_aluno = m.id_aluno
      WHERE m.id_turma = $1
      ORDER BY a.nome
    `,
    [idTurma]
  );

  return resultado.rows;
};

const criar = async (dados) => {
  const { id_aluno, id_turma } = dados;

  const resultado = await pool.query(
    `
      INSERT INTO escola.matriculas (
        id_aluno,
        id_turma
      )
      VALUES ($1, $2)
      RETURNING
        id_matricula,
        id_aluno,
        id_turma
    `,
    [id_aluno, id_turma]
  );

  return resultado.rows[0];
};

const atualizar = async (id, dados) => {
  const { id_aluno, id_turma } = dados;

  const resultado = await pool.query(
    `
      UPDATE escola.matriculas
      SET
        id_aluno = $1,
        id_turma = $2
      WHERE id_matricula = $3
      RETURNING
        id_matricula,
        id_aluno,
        id_turma
    `,
    [id_aluno, id_turma, id]
  );

  return resultado.rows[0] || null;
};

const deletar = async (id) => {
  const resultado = await pool.query(
    `
      DELETE FROM escola.matriculas
      WHERE id_matricula = $1
      RETURNING
        id_matricula,
        id_aluno,
        id_turma
    `,
    [id]
  );

  return resultado.rows[0] || null;
};

module.exports = {
  listarTodos,
  buscarPorId,
  listarPorAluno,
  listarPorTurma,
  criar,
  atualizar,
  deletar,
};