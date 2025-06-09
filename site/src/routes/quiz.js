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
    const {dataresposta, resultado, fkusuario } = req.body;

    const sql = 'INSERT INTO quiz (dataresposta, resultado, fkusuario) VALUES (?, ?, ?)';
    db.query(sql, [dataresposta, resultado, fkusuario], function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro ao salvar quiz" });
        }
    });
});

router.get('/buscar', function (req, res) {
    quizController.buscar(req, res);
});

router.get('/kpi', function (req, res) {
    const fkusuario = req.query.fkusuario;
    const sql = `
        SELECT resultado
        FROM quiz
        WHERE fkusuario = ?
        ORDER BY dataresposta DESC
        LIMIT 1
    `;
    db.query(sql, [fkusuario], function (err, results) {
        if (err) {
            return res.status(500).json({ erro: "Erro ao buscar KPI do quiz" });
        }
      let resultado = results[0]?.resultado || "Sem resultado";
        if (resultado.includes("—")) {
    resultado = resultado.split("—")[0].trim();
} else if (resultado.includes(" - ")) {
    resultado = resultado.split(" - ")[0].trim();
}
        res.status(200).json({ resultado });
    });
});

module.exports = router;
