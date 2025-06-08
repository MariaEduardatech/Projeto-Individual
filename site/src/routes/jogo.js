var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

router.post('/salvar', function (req, res) {
    const { acertos, erros, fkusuario} = req.body;

    const sql = 'INSERT INTO JogoMemoria (acertos, erros, fkusuario) VALUES (?, ?, ?)';
    db.query(sql, [acertos, erros, fkusuario], function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro ao salvar jogo" });
        }
    });
});

router.get('/resultados', function (req, res) {
    const sql = `
        SELECT 
            SUM(acertos) AS acertos,
            SUM(erros) AS erros
        FROM JogoMemoria
    `;
    db.query(sql, function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro ao buscar resultados" });
        }
        res.status(200).json(results);
    });
});


module.exports = router;
