
const productModel = require("../models/productModel.js");

const cartModel = require("../models/cartModel.js");

module.exports = {

  // listado de Productos
  products: ( req, res ) => {
    
    // procesar filtros de la pantalla
    let products = [];

    const Operador = {};

    const Names = [ 'buscar', 'ordenar', 'precio_minimo', 'precio_maximo', 'nuevo', 'oferta', 'especial', 'favoritos'];

    for( const name of Names){ 
      if( req.query[name] != undefined ) Operador[name] = req.query[name]; 
    }

    if( Object.keys(Operador).length ){
      
      products = productModel.listar();

      // filtros:
      if( Operador.buscar ){

      }

      if( Operador.nuevo ){

      }

      if( Operador.oferta ){

      }

      if( Operador.especial ){

      }

      if( Operador.favoritos ){

      }

      if( Operador.precio_minimo ){

      }

      if( Operador.precio_maximo ){

      }

      // Ordenamiento de Resultados:
      if( Operador.ordenar ){

        switch( Operador.ordenar ){
        case 'A-Z':
          break;
        case 'Z-A':
          break;
        case '9-1':
          break;
        case '1-9':
          break;
        }
      }
    }
    else if( Object.keys(req.query).length ){

      products = productModel.listar( req.query );
    }
    else{

      products = productModel.listar();
    }
    
    res.render( "shop/products", {
      
      head: {

        title: "Shop | Funkoshop",

        styles: [
          // complementos:
          "document/pagination",
          // por página:
          "pages/shop",
          "pages/shop/products"
        ]
      },      

      products
    });
  },

  // detalle del Producto
  product: ( req, res ) => {

    const Product = productModel.ver({ id: req.params.id });
    
    res.render( "shop/product", {

      head: {

        title: "Items del Carrito | Funkoshop",

        styles: [
          // complementos:
          "document/number",          
          // componentes:
          "components/slider",
          "components/product",
          // por página:
          "pages/shop",
          "pages/shop/product"          
        ],
  
        scripts: [
          // complementos:
          "document/number",
          // componente:
          "components/slider"
        ]
      },
      
      // slider
      products_title: "Productos Relacionados...",
      products_list: productModel.listar([ ['licence','==',Product.licence], ['id','<>',Product.id] ]),

      // formulario
      Product
    });
  },  

  // carrito del usuario con Productos seleccionados
  cart: ( req, res ) => {
    
    res.render( "shop/cart", {

      head: {

        title: "Carrito | Funkoshop",

        styles: [
          // complementos:
          "document/table",
          "document/number",          
          // componentes:
          "components/product",
          // por página:
          "pages/shop",
          "pages/shop/cart"
        ],

        scripts: [
          // complementos:
          "document/number",
          // por página
          "pages/shop/cart",
        ]
      },

      Cart: cartModel.ver({ user: 1 })
      
    });
  }
}