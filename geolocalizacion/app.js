if ("geolocation" in navigator) {
    console.log("La API de geolocalización está disponible.");
} else {
    console.error("La API de geolocalización no es compatible con este navegador.");
}
Notification.requestPermission(function(permission){
    console.log("El estado actual del permiso es", permission);
});
// Llamada para recoger la ubicacion actual
navigator.geolocation.getCurrentPosition(//successCallback, errorCallback, options)
    //Si es correcto
    
    function (position) {
        let notificacion = new Notification("Exito en conseguir tu ubicación", {
            body : "Ubicacion Obtenida",
            tag : "Ubi",
            requireInteraction : true,
           
        });
        console.log("Latitud:", position.coords.latitude);
        console.log("Longitud:", position.coords.longitude);
        /**
         * A partir de aqui usamos Leaflet como servicio de mapas Open Source
         */
        var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        const customIcon = L.icon({
            iconUrl: '../ProyectoJs/public/assets/img/icono.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
        L.marker([position.coords.latitude, position.coords.longitude], {icon:customIcon}).addTo(map)
        .bindPopup('Esta es tu ubicación')
        .openPopup();
        
     
   
  
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      for(let i = 0; i < array.length; i++){
        fetch(`https://concerts-artists-events-tracker.p.rapidapi.com/festival/infos?festival_id=15731${i}`, {
            method: 'GET',
            headers : {
                'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com',
                 'X-RapidAPI-Key': 'ff51a3b669msh24bec5edc06d06ap1dab0ejsnddf24f4f',
                 'Content-Type': 'application/json',
             }
        }).then(response => response.json()).
        then(data => {
            console.log(data);
            //L.marker([data.latitude, data.longitude]).addTo(map).bindPopup(data.name).openPopup();
        })
      }
      const conciertos = {
        1 : {
            latitude : 40.3517,
            longitude : -3.6957,
            nombre : 'RBF (La Caja Magica)'
        },
        2 : {
            latitude :40.4238,
            longitude : -3.6683,
            nombre : 'Luis Fonsi (Wizink Center)'
        },
        3 :{
            latitude : 40.4531,
            longitude : -3.6884,
            nombre : 'Aitana (Santiago Bernabeu)'
        },
        4 : {
            latitude : 40.4362,
            longitude : -3.5995,
            nombre : 'Feid (Wanda Metropolitano)'
        }
      }
     console.log("conciertos Madrid")
     for(let concierto in conciertos){
        L.marker([conciertos[concierto].latitude, conciertos[concierto].longitude]).addTo(map).bindPopup(conciertos[concierto].nombre).openPopup();
     }
  
  
    
    
    
    },
    // Si da error
    function (error) {
        console.error("Error al obtener la ubicación:", error.message);
        let notificacion = new Notification("Error en la ubicación", {
            body : "Permiso Denegado",
            tag : "Error",
            requireInteraction : true,
           
        });

        if (error.code === 1) {
            console.log("Permiso denegado.");
            
        } else if (error.code === 2) {
            console.log("No se pudo determinar la ubicación/ubicacion no disponible.");
        } else if (error.code === 3) {
            console.log("Tiempo de espera agotado.");
        }
    },
    // Otras opciones
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
);