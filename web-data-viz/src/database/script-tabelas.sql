-- Banco de dados simples para o projeto InfoAriana
-- Estrutura focada no que o site realmente precisa agora:
-- cadastro, login e armazenamento do resultado do quiz

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
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);
