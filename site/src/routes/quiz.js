var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

router.post('/guardar', function (req, res) {
    const {dataResposta, resultado } = req.body;

    // if (!usuario || !{
    //    , resultado return res.status(400).json({ erro: "Dados incompletos" });
    // }

    const sql = 'INSERT INTO quiz(dataResposta, resultado) VALUES (?, ?)';
    db.query(sql, [dataResposta, resultado], function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro ao salvar no banco de dados" });
        }
        res.status(201).json({ mensagem: "alvo com suc, resultadoesso!" });
    });
});

module.exports = router;
