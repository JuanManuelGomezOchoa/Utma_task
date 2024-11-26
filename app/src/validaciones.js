export const validateLogin = (datos) => {
    let errores = {};
    if (!datos.name || datos.name < 0) {
      errores.name = "El campo de nombre es obligatorio"
    } else if(datos.password.length < 1) {
        errores.name = "Nombre invalido"
    }


    if (!datos.password || datos.password < 1) {
      errores.password = "El campo de contraseña es obligatorio.";
    } else if(datos.password.length < 6){
        errores.password = "Contraseña invalida"
    }
  
    return errores;
  };
  
  export const validateRegister = (datos) => {
    let errores = {};
    if (!datos.name || datos.name < 0) {
      errores.name = "El campo de nombre es obligatorio"
    } else if(datos.password.length < 1) {
        errores.name = "Nombre invalido"
    }


    if (!datos.password || datos.password < 1) {
      errores.password = "El campo de contraseña es obligatorio.";
    } else if(datos.password.length < 6){
        errores.password = "Contraseña invalida"
    }
  
    return errores;
  };

  export const conteoErrores = (errores) => {
    return Object.keys(errores).length === 0;
  };