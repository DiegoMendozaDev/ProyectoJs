function buscarArtista() {
    let artista = document.getElementById("artista").value.trim();
    console.log("Buscando artista: " ,artista);
    fetch(`https://spotify23.p.rapidapi.com/search?q=${artista}&type=artist&limit=5`, {
        method: 'GET',
        headers : {
           'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
            'X-RapidAPI-Key': 'd894c02f4dmshaa97023ade66176p18471fjsne8b1860b93cd',
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        try {
            console.log("Respuesta completa de la API:", data);
            let h1 = document.createElement("h1");
            h1.textContent = ` Aqui tienes las 5 canciones elegidas por spotify de ${artista}`
            let body = document.getElementsByTagName("body")[0];
            body.appendChild(h1);
            let ul = document.createElement("ul");
            body.appendChild(ul)
                          
            for(let i = 0; i < data.albums.items.length; i++){
                let li = document.createElement("li");
                li.textContent = data.albums.items[i].data.name;
                ul.appendChild(li);
            }
            
            } catch (error) {
                console.log("Error al parsear la respuesta:", error);
            }
    })
}



// function buscarArtista() {
//     const xhr = new XMLHttpRequest();
//     let artista = document.getElementById("artista").value.trim();
//     console.log("Buscando el artista:", artista);


//     if (!artista) {
//         console.log("Por favor, ingrese un nombre de artista.");
//         return;
//     }

//     const A_URL = `https://spotify23.p.rapidapi.com/search?q=${artista}&type=artist&limit=5`;

//     xhr.open('GET', A_URL, true);


//     xhr.setRequestHeader('X-RapidAPI-Host', 'spotify23.p.rapidapi.com');
//     xhr.setRequestHeader('X-RapidAPI-Key', 'd894c02f4dmshaa97023ade66176p18471fjsne8b1860b93cd');

//     xhr.onload = function () {
//         if (xhr.status === 200 && xhr.readyState === 4) {
//             try {
//                 const data = JSON.parse(xhr.responseText);
//                 console.log("Respuesta completa de la API:", data);
//                 let h1 = document.createElement("h1");
//                 h1.textContent = ` Aqui tienes las 5 canciones elegidas por spotify de ${artista}`
//                 let body = document.getElementsByTagName("body")[0];
//                 body.appendChild(h1);
//                 let ul = document.createElement("ul");
//                 body.appendChild(ul)
              
//                 for(let i = 0; i < data.albums.items.length; i++){
//                     let li = document.createElement("li");
//                     li.textContent = data.albums.items[i].data.name;
//                     ul.appendChild(li);
//                 }

//             } catch (error) {
//                 console.log("Error al parsear la respuesta:", error);
//             }
//         } else {
//             console.log("Error en la solicitud: " + xhr.status);
//         }
//     };

//     xhr.onerror = function () {
//         console.log("Solicitud rechazada o fallo de conexión.");
//     };

//     xhr.send();
// }