'use strict';

/* agrego eventos a los botones */

[ "add", "remove" ].forEach( tipo => 
  
  Array.from( document.querySelectorAll(`.number__button--${tipo}`) ).forEach( btn => 
    
    btn.addEventListener('click',number) 
  ) 

);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* controlador numérico */

function number( event ){

  let button = event.target;

  if( button ){

    let numero = button.parentElement.parentElement.querySelector('input');

    if( button.classList.contains('number__button--add') ){

      numero.value = Number(numero.value) + 1;
    }
    else if( button.classList.contains('number__button--remove') ){

      numero.value = Number(numero.value) - 1;
    }

    if( Number(numero.value) < 0 ) numero.value = 0;
  }
  else{

    console.error( '{-_-} Debería haber recibido un evento, pero me enviaron: ', event );
  }
}




