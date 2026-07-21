// insira o código abaixo dentro de app.js
const express = require("express");
const alunoRoutes = require("./src/routes/alunoRoutes");
const boletimRoutes = require("./src/routes/boletimRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensagem: "API do Sistema Escolar funcionando!",
    versao: "1.0.0",
    endpoints: {
      alunos: "GET /alunos, POST /alunos, PUT /alunos/:id, DELETE /alunos/:id",
      boletim: "GET /boletim/:alunoId, GET /boletim/:alunoId/media",
    },
  });
});

app.use(alunoRoutes);
app.use(boletimRoutes);

app.use((erro, req, res, next) => {
  console.error("Erro interno:", erro.message);
  res.status(erro.status || 500).json({
    erro:
      process.env.NODE_ENV === "production"
        ? "Erro interno do servidor"
        : erro.message,
  });
});

module.exports = app;