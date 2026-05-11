var database = require("../database/config");

function autenticar(email, senha) {
    //serve para conferir se tem alguem com x email e x senha
    var instrucaoSql = `
        SELECT id, nome, email
        FROM usuario
        WHERE email = '${email}' AND senha = '${senha}';
    `;

    console.log("Executando a instrucao SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorEmail(email) {

    var instrucaoSql = `
        SELECT id, nome, email
        FROM usuario
        WHERE email = '${email}';
    `;

    console.log("Executando a instrucao SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    // se tudo estiver okay - insre o novo user na tabela
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha)
        VALUES ('${nome}', '${email}', '${senha}');
    `;

    console.log("Executando a instrucao SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    buscarPorEmail,
    cadastrar
};
