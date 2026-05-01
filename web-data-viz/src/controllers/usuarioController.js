var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined || email == "") {
        res.status(400).send("Seu email esta indefinido!");
    } else if (senha == undefined || senha == "") {
        res.status(400).send("Sua senha esta indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                if (resultadoAutenticar.length == 1) {
                    res.json({
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha invalido(s)");
                } else {
                    res.status(403).send("Mais de um usuario com o mesmo login e senha!");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined || nome == "") {
        res.status(400).send("Seu nome esta undefined!");
    } else if (email == undefined || email == "") {
        res.status(400).send("Seu email esta undefined!");
    } else if (senha == undefined || senha == "") {
        res.status(400).send("Sua senha esta undefined!");
    } else {
        usuarioModel.buscarPorEmail(email)
            .then(function (resultadoEmail) {
                if (resultadoEmail.length > 0) {
                    res.status(409).send("Ja existe um usuario cadastrado com esse email.");
                } else {
                    usuarioModel.cadastrar(nome, email, senha)
                        .then(function (resultado) {
                            res.json(resultado);
                        })
                        .catch(function (erro) {
                            console.log(erro);
                            res.status(500).json(erro.sqlMessage);
                        });
                }
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar
};
