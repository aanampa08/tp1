function conseguirQueryParam(paramBuscado) {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramBuscado);
}

function response_received(response) {
    return response.json();
}

function parse_data(data) {
    const animal = data.animal;
    let tipoAnimal = animal.TipoAnimal;
    if (tipoAnimal === 'Felino') {
        tipoAnimal = 'gato';
    } else {
        tipoAnimal = 'perro';
    }

    document.getElementById("adoptarNombre").innerHTML = `¡Adoptá a ${animal.Nombre}!`;
    document.getElementById("adoptionReasonLabel").innerHTML = `¿Por qué motivo querés adoptar un ${tipoAnimal}?`;
    document.getElementById("allergiesLabel").innerHTML = `¿Alguien en la familia tiene alergia a los ${tipoAnimal}s?`;
    document.getElementById("financialCommitmentLabel").innerHTML = `¿Estás dispuesto a afrontar los costos de mantener en buen estado la salud del ${tipoAnimal}?`;
    document.getElementById("timeCommitmentLabel").innerHTML = `¿Estás dispuesto a darle el tiempo necesario al ${tipoAnimal} para su adaptación?`;
    document.getElementById("compatibilityLabel").innerHTML = `¿Consideras que el ${tipoAnimal} es compatible con tu vida familiar y laboral actual y/o futura?`;
}

function request_error(error) {
    
    console.log(error);
}

const idAnimal = conseguirQueryParam("idAnimal");
fetch(`http://localhost:5000/animal/${idAnimal}`)
    .then(response_received)
    .then(parse_data)
    .catch(request_error);



function cargarDatos(){
    const username = conseguirQueryParam("username");
    fetch(`http://localhost:5000/usuarios/${username}`)
    .then(response => response.json())
    .then(datos => {
        if (datos.Usuario) {
            document.getElementById('name').value = datos.Usuario.Nombre;
            document.getElementById('phone').value = datos.Usuario.Telefono;
            document.getElementById('email').value = datos.Usuario.Email;
        } 
        else {
            alert("ERRORRRR");
        }
    })
    .catch((error) => console.log("Eror al buscar campos cargados:", error));
}

//carga los datos actuales al form antes de la modificacion
window.addEventListener('load', cargarDatos);

document.getElementById('formAdopcion').addEventListener('submit', function(event) {
    event.preventDefault(); 

   
    const animalID = conseguirQueryParam("idAnimal");
    const username = conseguirQueryParam("username");

   
    const formData = {
        animalID: animalID,
        username: username, 
        nombre: document.getElementById('name').value,
        edad: document.getElementById('age').value,
        profesion: document.getElementById('work').value,
        telefono: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        direccion: document.getElementById('address').value,
        localidad: document.getElementById('locality').value,
        motivo: document.getElementById('adoptionReason').value,
        tipoVivienda: document.getElementById('housingType').value,
        exteriores: document.getElementById('outdoorSpace').value,
        consenso: document.getElementById('householdAgreement').value,
        alergias: document.getElementById('allergies').value,
        costos: document.getElementById('financialCommitment').value,
        adaptacion: document.getElementById('timeCommitment').value,
        compatibilidad: document.getElementById('compatibility').value,
        regaloMascota: document.getElementById('pastExperience').value
    };

    fetch('http://localhost:5000/adopciones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            console.error('Error:', data.message);
        } else {
            console.log('Success:', data);
            alert('Solicitud de adopcion realizada con exito');
             window.location.href = "/"
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
