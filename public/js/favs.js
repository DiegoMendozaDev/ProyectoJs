function addFav(){
    // Obtener todos los elementos con la clase "material-symbols-outlined"
    let favs = document.getElementsByClassName("material-symbols-outlined");

    // La 'cookieSeparadas' está definida previamente.
    const idUsuario = cookieSeparadas[1].split('=')[1];

    // Iteramos usando un bucle for para recorrer solo los índices numéricos
    for (let i = 0; i < favs.length; i++) {
        favs[i].addEventListener("click", favourite);
    }
    
    function favourite() {
        const data = {
            idSong: this.id,
            idUser: idUsuario,
        };
        console.log(data);
        fetch("/users/favs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            // Si la respuesta no es exitosa, se muestra el error y se detiene la cadena
            if (!response.ok) {
                return response.json().then(mensaje => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: mensaje['mensaje']
                    });
                    throw new Error(mensaje['mensaje']);
                });
            }
            return response.json();
        })
        .then(mensaje => {
            Swal.fire({
                title: mensaje['mensaje'],
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                window.location.href = "/";
            }, 1700);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
}
