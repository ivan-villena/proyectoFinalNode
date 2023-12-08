
const fs = require("node:fs");

const Valor = require("../utils/Valor.js")

const users = JSON.parse( fs.readFileSync("./src/data/users.json", "utf-8") );

module.exports = {

  ver : ( filtros = {} ) => {   

    let listado = Valor.filtrar( users, filtros );

    if( listado[0] ) return (listado[0]);
  },
  
  listar : ( filtros ) => {

    let listado = Valor.filtrar( users, filtros );
  
    for( const User in listado ){      
  
      listado[User] = (listado[User]);
    }
  
    return listado;
  }
};