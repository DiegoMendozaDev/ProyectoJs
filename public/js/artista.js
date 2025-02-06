const xhr = new XMLHttpRequest();
let artista = document.getElementById("artista").value;
const A_URL = `https://spotify23.p.rapidapi.com/search?q=${artista}&type=artist&limit=1;`  // Búsqueda de Mecano

xhr.open('GET', A_URL, true);

// Configura los headers correctamente
xhr.setRequestHeader('X-RapidAPI-Host', 'spotify23.p.rapidapi.com');
xhr.setRequestHeader('X-RapidAPI-Key', 'd894c02f4dmshaa97023ade66176p18471fjsne8b1860b93cd');  // Reemplaza con tu clave de API

xhr.onload = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
        try {
            // Parsea la respuesta JSON
            const data = JSON.parse(xhr.responseText);
            
            // Verifica que la respuesta contenga los datos esperados
            console.log(data); // Muestra la respuesta completa para inspeccionarla

            // Asegúrate de que 'data.artists.items' esté presente y tenga datos
            if (data.artists && data.artists.items && data.artists.items.length > 0) {
                const artistId = data.artists.items[0].id;  // Obtén el ID de Mecano
                console.log("ID de Mecano:", artistId);  // Muestra el ID de Mecano
            } else {
                console.log("No se encontró el artista 'Mecano'.");
            }
        } catch (error) {
            console.log("Error al parsear la respuesta:", error);
        }
    } else {
        console.log("Error en la solicitud: " + xhr.status);
    }
};

xhr.onerror = function() {
    console.log("Solicitud rechazada o fallo de conexión.");
};

xhr.send();

