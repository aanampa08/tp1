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

        let aExit = document.createElement("a");
        aExit.className = "card__exit";
        let iExit = document.createElement("i");
        iExit.className = "fa-solid fa-xmark"
        aExit.addEventListener('click', (event) => borrar_adopcion(event, adopcion.idAdopcion));

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

        let exteriores = document.createElement("p");
        exteriores.innerHTML = `<b>¿Tiene balcón, terraza, patio o jardín?: </b>${adopcion.Exteriores}`;
        exteriores.className = "card__title"

        let consenso = document.createElement("p");
        consenso.innerHTML = `<b>¿Todos en el hogar quieren adoptar?: </b>${adopcion.Consenso}`;
        consenso.className = "card__title"

        let alergias = document.createElement("p");
        alergias.innerHTML = `<b>¿Alguien en la familia tiene alergia a las mascotas?: </b>${adopcion.Alergias}`;
        alergias.className = "card__title"

        let costos = document.createElement("p");
        costos.innerHTML = `<b>¿Estás dispuesto a afrontar los costos de mantener en buen estado la salud de la mascota?: </b>${adopcion.Costos}`;
        costos.className = "card__title"

        let adaptacion = document.createElement("p");
        adaptacion.innerHTML = `<b>¿Estás dispuesto a darle el tiempo necesario a la mascota para su adaptación?: </b>${adopcion.Adaptacion}`;
        adaptacion.className = "card__title"

        let compatibilidad = document.createElement("p");
        compatibilidad.innerHTML = `<b>¿Consideras que la mascota es compatible con tu vida familiar y laboral actual y/o futura?: </b>${adopcion.Compatibilidad}`;
        compatibilidad.className = "card__title"

        let regaloMascota = document.createElement("p");
        regaloMascota.innerHTML = `<b>¿Alguna vez debiste regalar una mascota?: </b>${adopcion.regaloMascota}`;
        regaloMascota.className = "card__title"

        
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
        divCard.append(exteriores);
        divCard.append(consenso);
        divCard.append(alergias);
        divCard.append(costos);
        divCard.append(adaptacion);
        divCard.append(compatibilidad);
        divCard.append(regaloMascota);

        aExit.append(iExit);
        divCard.append(aExit);
        

        
        adoptionRequestDiv.append(divCard);
    }
}


function request_error(error) {
    console.log("Error:", error);
}


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
            event.target.closest(".card").remove();
        })
        .catch(error => {
            console.error(`Error al borrar la solicitud de adopcion ${idAdopcion}:`, error);
            alert('Error al intentar eliminar la solicitud de adopcion. Inténtalo de nuevo más tarde.');
        });
}