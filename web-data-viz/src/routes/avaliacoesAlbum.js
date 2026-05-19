var express = require("express");
var router = express.Router();

var avaliacaoAlbumController = require("../controllers/avaliacaoAlbumController");

router.post("/salvar", function (req, res) {
    avaliacaoAlbumController.salvar(req, res);
});

router.get("/usuario/:idUsuario", function (req, res) {
    avaliacaoAlbumController.buscarPorUsuario(req, res);
});

router.get("/kpis/top-album", function (req, res) {
    avaliacaoAlbumController.buscarKpiAlbumMaisEstrelado(req, res);
});

router.get("/kpis/medias", function (req, res) {
    avaliacaoAlbumController.buscarMediasPorAlbum(req, res);
});

module.exports = router;
