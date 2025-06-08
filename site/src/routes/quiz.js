var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var quizController = require('../controllers/quizController'); 
var db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

router.post('/guardar', function (req, res) {
    const {dataResposta, resultado, fkusuario } = req.body;

    const sql = 'INSERT INTO quiz (dataResposta, resultado, fkusuario) VALUES (?, ?, ?)';
    db.query(sql, [dataResposta, resultado, fkusuario], function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro ao salvar quiz" });
        }
    });
});

router.get('/buscar', function (req, res) {
    quizController.buscar(req, res);
});

module.exports = router;
