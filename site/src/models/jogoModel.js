var database = require("../database/config")

function salvar(erros, acertos, fkusuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",  acertos, erros, fkusuario);
 
    var instrucaoSql = `
        INSERT INTO jogomemoria (acertos, erros, fkusuario) VALUES (${acertos}, ${erros}, ${fkusuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvar
  
};