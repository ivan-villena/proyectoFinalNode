
const bcrypt = require("bcrypt");

const userModel = require("../models/userModel.js");

module.exports = {

  // form: 
  login: ( req, res ) => {
    
    res.render( "user/login", { 

      head: {

        title: "Login | Funkoshop",

        styles: [
          "pages/user",
          "pages/user/login"            
        ],

        scripts:[
          "pages/user/login"
        ]
      }

     });
  },

  // proceso: validar e iniciar sesión
  loginProcess : ( req, res ) => {

    const { email, password } = req.body;

    const User = userModel.ver({ email });

    if( User ) {

      // hasheo password recibido y comparo con el guardado: 1234

      if( bcrypt.compareSync( password, User.password ) ){

        // cargo usuario en sesion
        req.session.user = User.id;

        return res.redirect('/products');
      }

      return res.status(401).render("error",{
        
        head: { 
          title: "Login"
        },
        data:{
          detalle: 'Password Incorrecto...'
        }        
      });
    }

    return res.status(401).render("error",{
      head: { 
        title: "Login"
      },
      data:{
        detalle: 'Usuario Inexistente...'
      }      
    });
  },

  // proceso: cerrar sesión
  logOutProcess : ( req, res ) => {

    delete(req.session.user);

    req.session.destroy( ( err ) => {
      
      !!err ? console.error(err) : res.redirect('/');
    });
  },

  // form: registro
  register: ( req, res ) => {
    
    res.render( "user/register", { 

      head: {

        title: "Registrarse | Funkoshop",

        styles: [
          "pages/user",
          "pages/user/register"            
        ],

        scripts:[
          "pages/user/validate"
        ]
      }
    });
  },

  // proceso: registrar el usuario
  registerProcess: ( req, res ) => {    

    // valores del form
    User = req.body;

    // hashear el password:
    User.password = bcrypt.hashSync( User.password, 5 );

    // ...guardar los datos

  }
}

