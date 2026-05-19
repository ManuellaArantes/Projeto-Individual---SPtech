var database = require("../database/config");

function salvarResultado(idUsuario, albumFinal, yt, me, dw, sw, tun, pos, es) {
    var instrucaoSql = `
        INSERT INTO resultado_quiz (
            fk_usuario,
            album_final,
            yt_pontos,
            me_pontos,
            dw_pontos,
            sw_pontos,
            tun_pontos,
            pos_pontos,
            es_pontos
        ) VALUES (
            '${idUsuario}',
            '${albumFinal}',
            '${yt}',
            '${me}',
            '${dw}',
            '${sw}',
            '${tun}',
            '${pos}',
            '${es}'
        );
    `;

    console.log("Executando a instrucao SQL:" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimoResultadoPorUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT *
        FROM resultado_quiz
        WHERE fk_usuario = '${idUsuario}'
        ORDER BY dt_resultado DESC, id DESC
        LIMIT 1;
    `;

    console.log("Executando a instrucao SQL:" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvarResultadoGeral(idUsuario, acertos, totalPerguntas, categoriaDestaque) {
    var instrucaoSql = `
        INSERT INTO resultado_quiz_geral (
            fk_usuario,
            acertos,
            total_perguntas,
            categoria_destaque
        ) VALUES (
            '${idUsuario}',
            '${acertos}',
            '${totalPerguntas}',
            '${categoriaDestaque}'
        );
    `;

    console.log("Executando a instrucao SQL:" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimoResultadoGeralPorUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT
            id,
            fk_usuario,
            acertos,
            total_perguntas,
            categoria_destaque,
            ROUND((acertos / total_perguntas) * 100, 0) AS percentual,
            dt_resultado
        FROM resultado_quiz_geral
        WHERE fk_usuario = '${idUsuario}'
        ORDER BY dt_resultado DESC, id DESC
        LIMIT 1;
    `;

    console.log("Executando a instrucao SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDistribuicaoCategoriasGeral() {
    var instrucaoSql = `
        SELECT
            categoria_destaque,
            COUNT(*) AS total_resultados
        FROM resultado_quiz_geral
        GROUP BY categoria_destaque
        ORDER BY total_resultados DESC, categoria_destaque ASC;
    `;

    console.log("Executando a instrucao SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvarResultado,
    buscarUltimoResultadoPorUsuario,
    salvarResultadoGeral,
    buscarUltimoResultadoGeralPorUsuario,
    buscarDistribuicaoCategoriasGeral
};
