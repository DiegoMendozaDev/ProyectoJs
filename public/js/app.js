const url = 'https://spotify23.p.rapidapi.com/search/';
const query = 'track';
const limit = 2;
const delayTime = 1;
/**
 * Se utiliza para sacar los ids de las canciones para usarlos posteriormente en otras funciones
 * @param {*} offset Esta funcion recibe 'offset', que seria un numero random generado al iniciar la funcion padre, este offset seria un numero aleatorio del 0 al 1000 para sacar una cancion aleatoria en spotify
 * @returns 
 */
function fetchCanciones(offset) {
  //url es la url de la api,query lo que queremos buscar,en este caso "track" que es cancion, offset mencionado anteriormente como una cancion alazar y limit para sacar un limite de canciones
  return fetch(`${url}?q=${query}&type=track&offset=${offset}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
      'X-RapidAPI-Key': 'ade3a10122msh3051862a836956fp1ea309jsn1fa708edae4f',
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json());
}
/**
 *  Esta funcion recibe el id de la cancion recibido de la funcion fetchCanciones, index es la posicion de la cancion, userLenguage es el idioma que el usuario escribe por teclado,contenedor es el contenido del artista,nombre de la cancion etc,nombreCancion el nombre de la cancion y nombreArtista el nombre del artista
 * @param {*} idCancion 
 * @param {*} index 
 * @param {*} idiomaELegido 
 * @param {*} contenedor 
 * @param {*} nombreCancion 
 * @param {*} nombreArtista 
 */
function fetchLetra(idCancion, index, idiomaELegido, contenedor, nombreCancion, nombreArtista) {
  setTimeout(() => {
    fetch(`https://spotify23.p.rapidapi.com/track_lyrics/?id=${idCancion}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
        'X-RapidAPI-Key': 'ade3a10122msh3051862a836956fp1ea309jsn1fa708edae4f',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.lyrics && data.lyrics.language && data.lyrics.language.toLowerCase() === idiomaELegido.toLowerCase()) {
        
        let letra = "";
        for (let i = 0; i < data.lyrics.lines.length; i++) {
          letra += data.lyrics.lines[i].words + "\n" + "<br>";
        }

        const contenedorCancion = document.createElement('div');
        contenedorCancion.innerHTML = `<p>Canción: ${nombreCancion} - Artista: ${nombreArtista} (Idioma: ${data.lyrics.language})</p>`;
        
        const elegirBtn = document.createElement('button');
        elegirBtn.textContent = "Elegir";
        
        contenedorCancion.innerHTML += "<br>";
        contenedorCancion.appendChild(elegirBtn);
        
        contenedor.appendChild(contenedorCancion);

        elegirBtn.addEventListener('click', () => {
          const parametros = new URLSearchParams({
            nombreCancion: nombreCancion,
            nombreArtista: nombreArtista,
            letra: letra
          }).toString();

          window.location.href = `cancionElegida.html?${parametros}`;
        });
      }
    })
    .catch(error => {
      console.error('Error al obtener la letra o el idioma:', error);
    });
  }, index * delayTime);
}



/**
 * Funcion padre,recibe el idioma que el usuario ha decidido ,comprueba este lenguaje,y llama a las dos funciones mencionadas anteriormente para hacer los 2 fetchs
 * @param {*} idiomaELegido 
 * @returns 
 */
function searchByLanguage(idiomaELegido) {
  if (!idiomaELegido) {
    alert('Por favor, ingresa un código de idioma válido.');
    return;
  }

  let offset = Math.floor(Math.random() * 1000);
  const contenedor = document.getElementById('results');
  contenedor.innerHTML = '';
//Hacemos el fetch de canciones para sacar aleatoriamente 1 cancion y sacar el id,nombre y artista de esta cancion
  fetchCanciones(offset)
    .then(data => {
      const tracks = data.tracks.items;
      if (tracks.length > 0) {
        tracks.forEach((track, index) => {
          const idCancion = track.data.id;
          const nombreCancion = track.data.name;
          const nombreArtista = track.data.artists.items[0].profile.name;

          console.log(`Obteniendo idioma de la canción con ID: ${idCancion}`);
          //Hacemos el fetch de la leltra para sacar el lenguaje de la cancion y la letra de esta
          fetchLetra(idCancion, index, idiomaELegido, contenedor, nombreCancion, nombreArtista);
        });
      } else {
        contenedor.innerHTML = 'No se encontraron canciones para la consulta.';
      }
    })
    .catch(error => {
      console.error('Error al obtener las canciones:', error);
    });
}

document.getElementById('searchButton').addEventListener('click', () => {
  const idiomaELegido = document.getElementById('languageInput').value.trim();

  if (!idiomaELegido) {
    alert('Por favor, ingresa un código de idioma válido (ej. "es", "en", "ko")');
    return;
  }

  const idiomaValido = ['en', 'es', 'ko', 'fr', 'de', 'it', 'ja', 'pt', 'ru', 'pl'];
  if (!idiomaValido.includes(idiomaELegido)) {
    alert('El código de idioma ingresado no es válido. Ejemplos válidos: "en", "es", "ko" , "pt", etc.');
    return;
  }

  searchByLanguage(idiomaELegido);
});
