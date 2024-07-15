function response_received(data) {
    response = data.json();
    return response;
}

function parse_data(adopciones) {

    let adopcionesListado = adopciones['adopciones'];
    let adoptionRequestDiv = document.getElementById("adoptionRequest");


    for (let i = 0; i < adopcionesListado.length; i++) {
        const adopcion = adopcionesListado[i];

        let divCard = document.createElement("div");
        divCard.className = `card card-${i % 4}`;

        let pExit = document.createElement("p");
        pExit.className = "card__exit";
        let iExit = document.createElement("i");
        iExit.className = "fa-solid fa-xmark"
        pExit.addEventListener('click', (event) => borrar_adopcion(event, adopcion.idAdopcion));

        let nombreAnimal = document.createElement("h3");
        nombreAnimal.innerText = `Solicitud para adoptar a ${adopcion.Animal}`;
        nombreAnimal.className = "card__title"


        let nombre = document.createElement("p");
        nombre.innerHTML = ` <b>Nombre:</b>${adopcion.Nombre}`;
        nombre.className = "card__title"


        let edad = document.createElement("p");
        edad.innerHTML = `<b>Edad: </b>${adopcion.Edad}`;
        edad.className = "card__title"


        let profesion = document.createElement("p");
        profesion.innerHTML = `<b>Profesión: </b>${adopcion.Profesion}`;
        profesion.className = "card__title"


        let telefono = document.createElement("p");
        telefono.innerHTML = `<b>Teléfono: </b>${adopcion.Telefono}`;
        telefono.className = "card__title"


        let email = document.createElement("p");
        email.innerHTML = `<b>Email: </b>${adopcion.Email}`;
        email.className = "card__title"


        let direccion = document.createElement("p");
        direccion.innerHTML = `<b>Dirección: </b>${adopcion.Direccion}`;
        direccion.className = "card__title"


        let localidad = document.createElement("p");
        localidad.innerHTML = `<b>Localidad: </b>${adopcion.Localidad}`;
        localidad.className = "card__title"


        let motivo = document.createElement("p");
        motivo.innerHTML = `<b>Motivo de adopción: </b>${adopcion.Motivo}`;
        motivo.className = "card__title"


        let tipoVivienda = document.createElement("p");
        tipoVivienda.innerHTML = `<b>Tipo de vivienda: </b>${adopcion.tipoVivienda}`;
        tipoVivienda.className = "card__title"


        // Append elements to the card
        divCard.append(nombreAnimal);
        divCard.append(nombre);
        divCard.append(edad);
        divCard.append(profesion);
        divCard.append(telefono);
        divCard.append(email);
        divCard.append(direccion);
        divCard.append(localidad);
        divCard.append(motivo);
        divCard.append(tipoVivienda);

        pExit.append(iExit);
        divCard.append(pExit);
        

        // Append the card to the adoption requests container
        adoptionRequestDiv.append(divCard);
    }
}


// Function to handle errors in the request
function request_error(error) {
    console.log("Error:", error);
}


// Fetch adoption requests from the server
fetch('http://localhost:5000/adopciones')
    .then(response_received)
    .then(parse_data)
    .catch(request_error);


function borrar_adopcion(event, idAdopcion) {
    event.preventDefault();

    const confirmacion = confirm(`¿Está seguro de eliminar esta solicitud de adopcion?`);
    if (!confirmacion) {
        return;
    }

    fetch(`http://localhost:5000/adopcion/${idAdopcion}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log("Eliminacion realizada con exito")
        })
        .catch(error => {
            console.error(`Error al borrar la solicitud de adopcion ${id}:`, error);
            alert('Error al intentar eliminar la solicitud de adopcion. Inténtalo de nuevo más tarde.');
        });
}