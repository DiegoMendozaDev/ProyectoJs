const url = 'https://spotify23.p.rapidapi.com/search/';
const query = 'track';
const limit = 10;
const delayTime = 1500;

function fetchTracks(offset) {
  return fetch(`${url}?q=${query}&type=track&offset=${offset}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
      'X-RapidAPI-Key': 'e010705a73msh040449f5e7f6977p135641jsn057842d94fd4',
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json());
}

function fetchLyrics(trackId, index, userLanguage, resultsContainer, trackName, trackArtist) {
  setTimeout(() => {
    fetch(`https://spotify23.p.rapidapi.com/track_lyrics/?id=${trackId}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
        'X-RapidAPI-Key': 'e010705a73msh040449f5e7f6977p135641jsn057842d94fd4',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.lyrics && data.lyrics.language && data.lyrics.language.toLowerCase() === userLanguage.toLowerCase()) {
        resultsContainer.innerHTML += `<p>Track: ${trackName} - Artist: ${trackArtist} (Idioma: ${data.lyrics.language})</p>`;
      }
    })
    .catch(error => {
      console.error('Error al obtener la letra o el idioma:', error);
    });
  }, index * delayTime);
}

function searchByLanguage(userLanguage) {
  if (!userLanguage) {
    alert('Por favor, ingresa un código de idioma válido.');
    return;
  }

  let offset = Math.floor(Math.random() * 1000);
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  fetchTracks(offset)
    .then(data => {
      const tracks = data.tracks.items;
      if (tracks.length > 0) {
        let requestCount = 0;
        tracks.forEach((track, index) => {
          const trackId = track.data.id;
          const trackName = track.data.name;
          const trackArtist = track.data.artists.items[0].profile.name;

          console.log(`Obteniendo idioma de la canción con ID: ${trackId}`);

          fetchLyrics(trackId, index, userLanguage, resultsContainer, trackName, trackArtist);
        });
      } else {
        resultsContainer.innerHTML = 'No se encontraron canciones para la consulta.';
      }
    })
    .catch(error => {
      console.error('Error al obtener las canciones:', error);
    });
}

document.getElementById('searchButton').addEventListener('click', () => {
  const userLanguage = document.getElementById('languageInput').value.trim();

  if (!userLanguage) {
    alert('Por favor, ingresa un código de idioma válido (ej. "es", "en", "ko")');
    return;
  }

  const validLanguages = ['en', 'es', 'ko', 'fr', 'de', 'it', 'ja', 'pt', 'ru', 'pl'];
  if (!validLanguages.includes(userLanguage)) {
    alert('El código de idioma ingresado no es válido. Ejemplos válidos: "en", "es", "ko".');
    return;
  }

  searchByLanguage(userLanguage);
});
