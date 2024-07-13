function conseguirIdAnimal(){
    const params = new URLSearchParams(window.location.search) 
    return params.get("idAnimal");
}

const idAnimal = conseguirIdAnimal();

function response_received(response) {
    return response.json()
}

function parse_data(data) {
    const animal = data.animal;
    let tipoAnimal = animal.TipoAnimal
    if (tipoAnimal === 'Felino'){
        tipoAnimal = 'gato'
    }
    else{
        tipoAnimal = 'perro'
    }

    document.getElementById("adoptarNombre").innerHTML = `¡Adoptá a ${animal.Nombre}!`;
    document.getElementById("adoptionReason").innerHTML = `¿Por qué motivo querés adoptar un ${tipoAnimal}?`;
    document.getElementById("allergies").innerHTML = `¿Alguien en la familia tiene alergia a los ${tipoAnimal}s?`;
    document.getElementById("financialCommitment").innerHTML = `¿Estás dispuesto a afrontar los costos de mantener en buen estado la salud del ${tipoAnimal}?`;
    document.getElementById("timeCommitment").innerHTML = `¿Estás dispuesto a darle el tiempo necesario al ${tipoAnimal} para su adaptación?`;
    document.getElementById("compatibility").innerHTML = `¿Consideras que el ${tipoAnimal} es compatible con tu vida familiar y laboral actual y/o futura?`;
}

function request_error(error) {
    console.log("ERROR")
    console.log(error);
}

fetch(`http://localhost:5000/animal/${idAnimal}`)
    .then(response_received)
    .then(parse_data)
    .catch(request_error)
