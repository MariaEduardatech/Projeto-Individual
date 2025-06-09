var database = require("../database/config")

function guardar(dataresposta, resultado, fkusuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", dataresposta, resultado, fkusuario);
 
    var instrucaoSql = `
        INSERT INTO quiz (dataresposta, resultado, fkusuario) VALUES ('${dataresposta}', '${resultado}' , '${fkusuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscar() {
    var instrucaoSql = `
        SELECT 
            COUNT(CASE WHEN resultado LIKE '%Laranja%' THEN 1 END) AS laranja,
            COUNT(CASE WHEN resultado LIKE '%Preto%' THEN 1 END) AS preto,
            COUNT(CASE WHEN resultado LIKE '%Tricolor%' THEN 1 END) AS tricolor,
            COUNT(CASE WHEN resultado LIKE '%Siamês%' THEN 1 END) AS siames,
            COUNT(CASE WHEN resultado LIKE '%Frajola%' THEN 1 END) AS frajola
        FROM quiz;
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    guardar,
    buscar
};