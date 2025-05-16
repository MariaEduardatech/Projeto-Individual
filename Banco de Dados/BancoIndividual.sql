CREATE DATABASE Projeto_individual;

USE Projeto_individual;

CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR (80),
senha VARCHAR(20)
);

drop table usuario;