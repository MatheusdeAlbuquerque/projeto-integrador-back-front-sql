// insira dentro de boletimRoutes
const express = require("express");
const router = express.Router();

const { boletim, media } = require("../controllers/boletimController");
const autenticar = require("../middlewares/autenticar");

router.get("/boletim/:alunoId", autenticar, boletim);
router.get("/boletim/:alunoId/media", autenticar, media);

module.exports = router;
 