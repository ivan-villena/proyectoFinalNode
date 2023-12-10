
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

      // filtros:
      let producto_valido;

      if( Operador.precio_minimo ) Number(Operador.precio_minimo);

      if( Operador.precio_maximo ) Number(Operador.precio_maximo);

      for( const Product of productModel.listar() ){        

        producto_valido = true;

        if( !!Operador.buscar 
          && 
          !(
          Operador.buscar.toLowerCase() == Product.name.toLowerCase() || 
          Operador.buscar.toLowerCase() == Product.Category.name.toLowerCase() || 
          Operador.buscar.toLowerCase() == Product.Licence.name.toLowerCase() 
          ) 
        ){
          producto_valido = false;
        }
  
        if( producto_valido && Operador.nuevo && !Product.is_new ) producto_valido = false;
  
        if( producto_valido && Operador.oferta && !Product.is_ofert ) producto_valido = false;
  
        if( producto_valido && Operador.especial && !Product.is_limited ) producto_valido = false;
  
        if( producto_valido && Operador.favoritos && !Product.is_favorite ) producto_valido = false;
  
        if( producto_valido && Operador.precio_minimo && Product.price < Operador.precio_minimo ) producto_valido = false;
  
        if( producto_valido && Operador.precio_maximo && Product.price > Operador.precio_maximo  ) producto_valido = false;

        if( producto_valido ) products.push(Product);
      }      

      // Ordenamiento de Resultados:
      if( Operador.ordenar ){

        let comparacion = 0;

        switch( Operador.ordenar ){
        case 'A-Z':
          products = products.sort( ( a, b ) => {

            if( a.name.toLowerCase() > b.name.toLowerCase() ){
              comparacion = 1;
            }
            else if( a.name.toLowerCase() < b.name.toLowerCase() ){
              comparacion = -1;
            }

            return comparacion;
          });
          break;
        case 'Z-A':
          products = products.sort( ( a, b ) => {

            if( a.name.toLowerCase() < b.name.toLowerCase() ){
              comparacion = 1;
            }
            else if( a.name.toLowerCase() > b.name.toLowerCase() ){
              comparacion = -1;
            }
            
            return comparacion;
          });
          break;
        case '1-9':
          products = products.sort( ( a, b ) => {

            if( a.price < b.price ){
              comparacion = 1;
            }
            else if( a.price > b.price ){
              comparacion = -1;
            }

            return comparacion;
          });
          break;          
        case '9-1':
          products = products.sort( ( a, b ) => {

            if( a.price < b.price ){
              comparacion = 1;
            }
            else if( a.price > b.price ){
              comparacion = -1;
            }

            return comparacion;            
          } );
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
      
      Operador,

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