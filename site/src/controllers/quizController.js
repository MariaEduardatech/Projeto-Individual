var quizModel = require("../models/quizModel");

function guardar(req, res) {
var resultado = req.body.resultado;
var fkusuario = req.body.fkusuario;

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        quizModel.guardar(dataResposta, resultado, fkusuario) 
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao salvar! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

function buscar(req, res) {
    quizModel.buscar()
    .then(
        function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    guardar,
    buscar
}