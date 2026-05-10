-- Banco de dados simples para o projeto InfoAriana
-- Tabelas usadas para cadastro, albuns e resultado do quiz

DROP DATABASE IF EXISTS infoariana;
CREATE DATABASE infoariana;

USE infoariana;

-- Tabela de usuarios
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha VARCHAR(80) NOT NULL,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de albuns usados no site e no quiz
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
    ('Eternal Sunshine', 2024, 'we can''t be friends');

-- Tabela para salvar os resultados do quiz de cada usuario
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
