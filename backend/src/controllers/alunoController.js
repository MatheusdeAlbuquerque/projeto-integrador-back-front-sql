// dentro de alunoController insira o código abaixo:
const repository = require("../repositories/alunoRepository");

const listar = async (req, res) => {
  try {
    const alunos = await repository.listarTodos();
    res.json(alunos);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao listar alunos" });
  }
};

const obterPorId = async (req, res) => {
  try {
    const aluno = await repository.buscarPorId(req.params.id);

    if (!aluno) {
      return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    res.json(aluno);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar aluno" });
  }
};

const criar = async (req, res) => {
  try {
    const { nome, email, matricula, data_nascimento } = req.body;

    if (!nome || !email || !matricula) {
      return res.status(400).json({
        erro: "Nome, email e matrícula são obrigatórios",
      });
    }

    const aluno = await repository.criar({
      nome,
      email,
      matricula,
      data_nascimento,
    });

    res.status(201).json(aluno);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar aluno" });
  }
};

const atualizar = async (req, res) => {
  try {
    const aluno = await repository.atualizar(
      req.params.id,
      req.body
    );

    if (!aluno) {
      return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    res.json(aluno);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar aluno" });
  }
};

const deletar = async (req, res) => {
  try {
    const aluno = await repository.deletar(req.params.id);

    if (!aluno) {
      return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    res.json({ mensagem: "Aluno removido com sucesso" });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao deletar aluno" });
  }
};

module.exports = {
  listar,
  obterPorId,
  criar,
  atualizar,
  deletar,
};