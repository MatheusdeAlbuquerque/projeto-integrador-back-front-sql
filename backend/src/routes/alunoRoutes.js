// dentro de alunoRoutes.js insira o código abaixo:
const express = require("express");
const router = express.Router();

const {
  listar,
  obterPorId,
  criar,
  atualizar,
  deletar,
} = require("../controllers/alunoController");

const autenticar = require("../middlewares/autenticar");
const admin = require("../middlewares/admin");

router.get("/alunos", listar);
router.get("/alunos/:id", obterPorId);
router.post("/alunos", autenticar, admin, criar);
router.put("/alunos/:id", autenticar, admin, atualizar);
router.delete("/alunos/:id", autenticar, admin, deletar);

module.exports = router;