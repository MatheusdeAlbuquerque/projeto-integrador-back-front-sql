// dentro de boletimController coloque o código abaixo:
const boletimRepository = require("../repositories/boletimRepository");

const boletim = async (req, res) => {
  try {
    const { alunoId } = req.params;
    const boletim = await boletimRepository.boletimDoAluno(alunoId);

    if (boletim.length === 0) {
      return res
        .status(404)
        .json({ erro: "Nenhum boletim encontrado para este aluno" });
    }

    res.json(boletim);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar boletim" });
  }
};

const media = async (req, res) => {
  try {
    const { alunoId } = req.params;
    const medias = await boletimRepository.mediaPorDisciplina(alunoId);
    res.json(medias);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao calcular médias" });
  }
};

module.exports = { boletim, media };