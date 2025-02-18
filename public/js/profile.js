fetch('/get/profile', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  })
.then(response => response.json())
.then(datos => guardarDatos(datos))
.catch(err => console.error(err));
// Funcion que pinta todos los estudiantes
function guardarDatos(datos) {
    // Si hay contenido, vamos a pintar
    if (datos != null) {
        console.log(datos);
    }
}