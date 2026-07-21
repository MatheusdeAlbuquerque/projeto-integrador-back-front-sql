// dentro de seed.js coloque o código abaixo:
require("dotenv").config();

const pool = require("./src/database/pg");

async function seed() {
  console.log("Populando banco de dados...");

  // Limpar dados existentes
  await pool.query("DELETE FROM notas");
  await pool.query("DELETE FROM matriculas");
  await pool.query("DELETE FROM turmas");
  await pool.query("DELETE FROM disciplinas");
  await pool.query("DELETE FROM professores");
  await pool.query("DELETE FROM alunos");

  // Alunos
  await pool.query(`
    INSERT INTO alunos (nome, email, matricula, data_nascimento) VALUES
    ('Ana Silva', 'ana@email.com', 'MAT001', '2005-03-15'),
    ('Bruno Santos', 'bruno@email.com', 'MAT002', '2004-07-22'),
    ('Carla Oliveira', 'carla@email.com', 'MAT003', '2005-01-10')
  `);



  await pool.query(
    `INSERT INTO professores (nome, email, especialidade, senha, role) VALUES
     ($1, $2, $3, $4, $5)`,
    ["Prof. Carlos", "carlos@email.com", "Matemática", senhaHash, "admin"]
  );

  await pool.query(
    `INSERT INTO professores (nome, email, especialidade, senha, role) VALUES
     ($1, $2, $3, $4, $5)`,
    ["Profa. Mariana", "mariana@email.com", "Português", senhaHash, "admin"]
  );

  // Disciplinas
  await pool.query(`
    INSERT INTO disciplinas (nome, carga_horaria) VALUES
    ('Matemática', 80),
    ('Português', 80),
    ('História', 60)
  `);

  // Turmas
  await pool.query(`
    INSERT INTO turmas (codigo, disciplina_id, professor_id, semestre) VALUES
    ('MAT2024-1', 1, 1, '2024.1'),
    ('POR2024-1', 2, 2, '2024.1'),
    ('HIS2024-1', 3, 1, '2024.1')
  `);

  // Matrículas
  await pool.query(`
    INSERT INTO matriculas (aluno_id, turma_id) VALUES
    (1, 1), (1, 2),
    (2, 1), (2, 3),
    (3, 2), (3, 3)
  `);

  // Notas
  await pool.query(`
    INSERT INTO notas (matricula_id, nota, tipo) VALUES
    (1, 8.5, 'prova'), (1, 9.0, 'trabalho'),
    (2, 7.0, 'prova'), (2, 8.0, 'trabalho'),
    (3, 6.5, 'prova'), (3, 7.0, 'trabalho'),
    (4, 9.5, 'prova'), (4, 10.0, 'trabalho'),
    (5, 5.0, 'prova'), (5, 6.0, 'trabalho'),
    (6, 8.0, 'prova'), (6, 8.5, 'trabalho')
  `);

  console.log("Banco populado com sucesso!");
  console.log("Admin: carlos@email.com / senha: admin123");

  await pool.end();
}

seed().catch((erro) => {
  console.error("Erro ao popular banco:", erro);
  process.exit(1);
});