
'use strict';

class form_error {

  name = "";
  
  msg = "";

  constructor( name, msg ){

    this.name = name;

    this.msg = msg;

  }
}

const form = document.querySelector(`.form`);

if( form ){

  form.addEventListener( 'submit', ( submit ) => {    

    // ejecutar validaciones
    const errors = [];

    // Obligatorios: Nombre, Apellido, Email, Contraseña y Repetir Constraseña...

    // Formato del Nombre y Apellido: Palabra Unica sin Números

    // Formato del Email

    // Formato de la Contraseña

    // Contraseña debe Coincidir con Repetir Contraseña

    /* -- modo agregar -- */

    // - términos y condiciones
    const accept = form.querySelector(`#user-accept`);

    if( accept && !accept.checked ){

      errors.push( new form_error( "accept", "Debes aceptar los términos y Condiciones para poder Registrarte..." ))
    }

    /* -- proceso errores -- */

    if( errors.length ){

      submit.preventDefault();

      // mostrar mensajes
      let text = [];

      for( const error of errors ){

        text.push(`- ${error.msg}`);
      }      

      alert( text.join("\n") );      
    }

  });
}