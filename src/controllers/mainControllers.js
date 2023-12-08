
const productModel = require("../models/productModel.js");

const collectionModel = require("../models/collectionModel.js")

module.exports = {

  home: ( req, res ) => {

    res.render( "home", { 

      head: {

        title: "Home | Funkoshop",
      
        styles: [
          "components/hero",
          "components/collection",
          "components/slider"
        ],

        scripts: [ 
          "components/slider" 
        ]
      },

      // colecciones
      collections: collectionModel.listar([ ['id','<>',4] ]),

      // slider
      products_title: "Últimos Lanzamientos...",
      products_list: productModel.listar([ ['is_new','==',true] ])
    })
  },

  contact: ( req, res ) => {

    // res.send(`Vista de Contacto`);

    res.render( "contact", {

      head:{
        title: "Contacto | Funkoshop"
      }
      
    });
  }

}