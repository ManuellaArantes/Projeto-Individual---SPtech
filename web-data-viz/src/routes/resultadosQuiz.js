var express = require("express");
var router = express.Router();

var resultadoQuizController = require("../controllers/resultadoQuizController");

router.post("/salvar", function (req, res) {
    resultadoQuizController.salvar(req, res);
});

router.get("/ultimo/:idUsuario", function (req, res) {
    resultadoQuizController.buscarUltimoPorUsuario(req, res);
});

router.post("/geral/salvar", function (req, res) {
    resultadoQuizController.salvarGeral(req, res);
});

router.get("/geral/ultimo/:idUsuario", function (req, res) {
    resultadoQuizController.buscarUltimoGeralPorUsuario(req, res);
});

router.get("/geral/categorias", function (req, res) {
    resultadoQuizController.buscarDistribuicaoCategoriasGeral(req, res);
});

module.exports = router;
