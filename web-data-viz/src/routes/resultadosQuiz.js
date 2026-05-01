var express = require("express");
var router = express.Router();

var resultadoQuizController = require("../controllers/resultadoQuizController");

router.post("/salvar", function (req, res) {
    resultadoQuizController.salvar(req, res);
});

router.get("/ultimo/:idUsuario", function (req, res) {
    resultadoQuizController.buscarUltimoPorUsuario(req, res);
});

module.exports = router;
