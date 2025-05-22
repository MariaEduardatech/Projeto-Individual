var quizModel = require("../models/quizModel");

function guardar(req, res) {
    var resultado = req.body.resultadoServer;


        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        quizModel.cadastrar//( fkusuario, resultdoQuiz, fkquiz) 
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }


module.exports = {guardar
}