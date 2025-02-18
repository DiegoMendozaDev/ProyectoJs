fetch('/get/token')
.then(response => response.json())
.then(datos => guardarDatos(datos))
.catch(err => console.error(err));
// Funcion que pinta todos los estudiantes
function guardarDatos(datos) {
    // Si hay contenido, vamos a pintar
    let tokenDiv = document.getElementById('token');
    if (datos != null) {
        localStorage.setItem('access_token', datos['access_token']);
        tokenDiv.textContent = datos['access_token'];
    }
}