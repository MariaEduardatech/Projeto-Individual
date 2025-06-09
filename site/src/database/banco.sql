USE Projeto_individual;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45)
);

CREATE TABLE JogoMemoria (
    idJogo INT PRIMARY KEY AUTO_INCREMENT,
    dataPartida DATETIME DEFAULT CURRENT_TIMESTAMP, 
    acertos INT,
    erros INT,
    fkusuario INT,
    FOREIGN KEY (fkusuario) REFERENCES usuario(id)
);

CREATE TABLE Quiz (
    idQuiz INT PRIMARY KEY AUTO_INCREMENT,
    Dataresposta DATETIME DEFAULT CURRENT_TIMESTAMP,
    resultado VARCHAR(150),
    fkusuario INT,
    FOREIGN KEY (fkusuario) REFERENCES usuario(id)
);