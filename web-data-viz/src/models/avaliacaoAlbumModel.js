var database = require("../database/config");

function limparTextoSql(texto) {
    return String(texto).replace(/'/g, "''");
}

function salvarAvaliacao(idUsuario, albumNome, nota) {
    var albumTratado = limparTextoSql(albumNome);

    var instrucaoSql = `
        INSERT INTO avaliacao_album (
            fk_usuario,
            album_nome,
            nota
        ) VALUES (
            '${idUsuario}',
            '${albumTratado}',
            '${nota}'
        )
        ON DUPLICATE KEY UPDATE
            nota = '${nota}',
            dt_avaliacao = CURRENT_TIMESTAMP;
    `;

    console.log("Executando a instrucao SQL:" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function removerAvaliacao(idUsuario, albumNome) {
    var albumTratado = limparTextoSql(albumNome);

    var instrucaoSql = `
        DELETE FROM avaliacao_album
        WHERE fk_usuario = '${idUsuario}'
          AND album_nome = '${albumTratado}';
    `;

    console.log("Executando a instrucao SQL" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAvaliacoesPorUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT album_nome, nota
        FROM avaliacao_album
        WHERE fk_usuario = '${idUsuario}';
    `;

    console.log("Executando a instrucao SQL" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiAlbumMaisEstrelado() {
    var instrucaoSql = `
        SELECT
            album_nome,
            SUM(nota) AS total_estrelas,
            ROUND(AVG(nota), 1) AS media_estrelas,
            COUNT(*) AS total_avaliacoes
        FROM avaliacao_album
        GROUP BY album_nome
        ORDER BY total_estrelas DESC, media_estrelas DESC, total_avaliacoes DESC, album_nome ASC
        LIMIT 1;
    `;

    console.log("Executando a instrucao SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediasPorAlbum() {
    var instrucaoSql = `
        SELECT
            a.nome AS album_nome,
            COALESCE(ROUND(AVG(aa.nota), 1), 0) AS media_estrelas,
            COALESCE(SUM(aa.nota), 0) AS total_estrelas,
            COUNT(aa.id) AS total_avaliacoes
        FROM album a
        LEFT JOIN avaliacao_album aa
            ON aa.album_nome = a.nome
        GROUP BY a.nome
        ORDER BY FIELD(
            a.nome,
            'Yours Truly',
            'My Everything',
            'Dangerous Woman',
            'Sweetener',
            'Thank U, Next',
            'Positions',
            'Eternal Sunshine',
            'Petal'
        );
    `;

    console.log("Executando a instrucao SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvarAvaliacao,
    removerAvaliacao,
    buscarAvaliacoesPorUsuario,
    buscarKpiAlbumMaisEstrelado,
    buscarMediasPorAlbum
};
