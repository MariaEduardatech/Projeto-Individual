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

    const sql = 'INSERT INTO jogojemoria (acertos, erros, fkusuario) VALUES (?, ?, ?)';
    db.query(sql, [acertos, erros, fkusuario], function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro ao salvar jogo" });
        }
    });
});

router.get('/resultados', function (req, res) {

    var fkusuario = req.query.fkusuario;
    
    const sql = `
        SELECT 
            SUM(acertos) AS acertos,
            SUM(erros) AS erros
        FROM jogomemoria where fkusuario = ?
    `;
    db.query(sql, [fkusuario], function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro ao buscar resultados" });
        }
        res.status(200).json(results);
    });
});

router.get('/kpi', function (req, res) {
    const fkusuario = req.query.fkusuario;

    const sql = `
        SELECT 
            IFNULL(SUM(acertos),0) AS totalAcertos
        FROM jogojemoria
        WHERE fkusuario = ?
    `;
    db.query(sql, [fkusuario], function (err, results) {
        if (err) {
            return res.status(500).json({ erro: "Erro ao buscar KPIs" });
        }
        res.status(200).json(results[0]);
    });
});
module.exports = router;
