var avaliacaoAlbumModel = require("../models/avaliacaoAlbumModel");

function salvar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var albumNome = req.body.albumNomeServer;
    var nota = Number(req.body.notaServer);

    if (idUsuario == undefined || albumNome == undefined || Number.isNaN(nota)) {
        res.status(400).send("Dados da avaliacao estao incompletos.");
    } else if (!Number.isInteger(nota) || nota < 0 || nota > 5) {
        res.status(400).send("A nota deve ser um numero inteiro entre 0 e 5.");
    } else {
        var acao = nota === 0
            ? avaliacaoAlbumModel.removerAvaliacao(idUsuario, albumNome)
            : avaliacaoAlbumModel.salvarAvaliacao(idUsuario, albumNome, nota);

        acao
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("idUsuario esta undefined!");
    } else {
        avaliacaoAlbumModel.buscarAvaliacoesPorUsuario(idUsuario)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarKpiAlbumMaisEstrelado(req, res) {
    avaliacaoAlbumModel.buscarKpiAlbumMaisEstrelado()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(204).send();
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarMediasPorAlbum(req, res) {
    avaliacaoAlbumModel.buscarMediasPorAlbum()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(204).send();
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    salvar,
    buscarPorUsuario,
    buscarKpiAlbumMaisEstrelado,
    buscarMediasPorAlbum
};
