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

    console.log("Executando a instrucao SQL:\n" + instrucaoSql);
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

    console.log("Executando a instrucao SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvarResultado,
    buscarUltimoResultadoPorUsuario
};
