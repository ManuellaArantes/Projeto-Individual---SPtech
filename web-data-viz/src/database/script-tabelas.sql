CREATE DATABASE ariana;
USE ariana;


CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha VARCHAR(80) NOT NULL,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE album (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL UNIQUE,
    ano_lancamento INT NOT NULL,
    musica_destaque VARCHAR(80) NOT NULL
);

INSERT INTO album (nome, ano_lancamento, musica_destaque) VALUES
    ('Yours Truly', 2013, 'The Way'),
    ('My Everything', 2014, 'Problem'),
    ('Dangerous Woman', 2016, 'Into You'),
    ('Sweetener', 2018, 'no tears left to cry'),
    ('Thank U, Next', 2019, '7 rings'),
    ('Positions', 2020, 'positions'),
    ('Eternal Sunshine', 2024, 'we can''t be friends'),
    ('Petal', 2026, 'Em breve');

CREATE TABLE resultado_quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    album_final VARCHAR(40) NOT NULL,
    yt_pontos INT NOT NULL,
    me_pontos INT NOT NULL,
    dw_pontos INT NOT NULL,
    sw_pontos INT NOT NULL,
    tun_pontos INT NOT NULL,
    pos_pontos INT NOT NULL,
    es_pontos INT NOT NULL,
    dt_resultado DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    FOREIGN KEY (album_final) REFERENCES album(nome)
);


CREATE TABLE resultado_quiz_geral (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    acertos INT NOT NULL,
    total_perguntas INT NOT NULL,
    categoria_destaque VARCHAR(40) NOT NULL,
    dt_resultado DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);


CREATE TABLE avaliacao_album (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    album_nome VARCHAR(40) NOT NULL,
    nota INT NOT NULL,
    dt_avaliacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    FOREIGN KEY (album_nome) REFERENCES album(nome),
    UNIQUE KEY uk_usuario_album (fk_usuario, album_nome),
    CONSTRAINT chk_nota_album CHECK (nota BETWEEN 1 AND 5)
);
