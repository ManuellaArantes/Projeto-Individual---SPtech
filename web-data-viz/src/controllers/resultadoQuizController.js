var resultadoQuizModel = require("../models/resultadoQuizModel");

function salvar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var albumFinal = req.body.albumFinalServer;
    var yt = req.body.ytServer;
    var me = req.body.meServer;
    var dw = req.body.dwServer;
    var sw = req.body.swServer;
    var tun = req.body.tunServer;
    var pos = req.body.posServer;
    var es = req.body.esServer;

    if (idUsuario == undefined || albumFinal == undefined) {
        res.status(400).send("Dados do resultado do quiz estao incompletos.");
    } else {
        resultadoQuizModel.salvarResultado(idUsuario, albumFinal, yt, me, dw, sw, tun, pos, es)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarUltimoPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("idUsuario esta undefined!");
    } else {
        resultadoQuizModel.buscarUltimoResultadoPorUsuario(idUsuario)
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
}

module.exports = {
    salvar,
    buscarUltimoPorUsuario
};
