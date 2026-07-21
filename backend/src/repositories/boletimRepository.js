//inserir dentro do arquivo src\repositories\boletimRepository.js o código abaixo

const pool = require("../database/pg");

const boletimDoAluno = async (alunoId) => {
  const resultado = await pool.query(
    "SELECT * FROM vw_boletim WHERE aluno_id = $1 ORDER BY disciplina_nome, data_avaliacao",
    [alunoId]
  );

  return resultado.rows;
};

const boletimDaTurma = async (turmaId) => {
  const resultado = await pool.query(
    `SELECT * FROM vw_boletim
     WHERE turma_codigo = (SELECT codigo FROM turmas WHERE id = $1)
     ORDER BY aluno_nome, disciplina_nome`,
    [turmaId]
  );

  return resultado.rows;
};

const mediaPorDisciplina = async (alunoId) => {
  const resultado = await pool.query(
    `SELECT
       disciplina_nome,
       ROUND(AVG(nota), 2) AS media,
       COUNT(*) AS total_avaliacoes
     FROM vw_boletim
     WHERE aluno_id = $1 AND nota IS NOT NULL
     GROUP BY disciplina_nome
     ORDER BY disciplina_nome`,
    [alunoId]
  );

  return resultado.rows;
};

module.exports = {
  boletimDoAluno,
  boletimDaTurma,
  mediaPorDisciplina,
};