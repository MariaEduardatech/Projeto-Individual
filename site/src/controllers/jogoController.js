var jogoModel = require("../models/jogoModel");

function salvar(req, res){
    var erros = req.body.erros;
    var acertos = req.body.acertos;
    var fkusuario = req.body.fkusuario;

    jogoModel.salvar(acertos, erros, fkusuario)
    .then(resultado => res.json(resultado))
    .catch(erro => {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    salvar
}