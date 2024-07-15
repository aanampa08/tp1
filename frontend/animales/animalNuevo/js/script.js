// -------------- FETCH POST PARA CREAR UN NUEVO USUARIO -----------------------------------------
document.getElementById('formularioNuevaHuella').addEventListener('submit', function (event) {
    // Evitar el envío del formulario
    event.preventDefault();


    // Consigo los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('numEdad').value;

    const tipoEdad = document.getElementById('tipoEdad').options[document.getElementById('tipoEdad').selectedIndex].text;
    const tipoAnimal = document.getElementById('tipoAnimal').options[document.getElementById('tipoAnimal').selectedIndex].text;
    const sexo = document.getElementById('sexos').options[document.getElementById('sexos').selectedIndex].text;
    const barrio = document.getElementById('barrios').options[document.getElementById('barrios').selectedIndex].text;
    // const barrio=document.get

    const descripcion = document.getElementById('descripcion').value;
    const foto = document.getElementById('urlImagen').value;
    const contacto = document.getElementById('idContacto').value;

    const nuevoAnimal = {
        nombre: nombre
        , edad: edad
        , tipoEdad: tipoEdad
        , sexo: sexo
        , descripcion: descripcion
        , foto: foto
        , contacto: contacto
        , barrio: barrio
        ,tipo:tipoAnimal

    };

    console.log(nuevoAnimal);
    const method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoAnimal)
    };

    fetch('http://localhost:5000/animales', method)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo crear el animal');
            }
            return response.json();
        })
        .then(resultado => {
            alert(`Animal ${nombre} agregado exitosamente!`)
            window.location.href = '/animales/index.html?user=admin';
        })
        .catch(error => {
            console.error('Error:', error);
        });



}

);



//funciones para el fetch de barrios
function response_received_Barrios(data) {
    //al contenido obtenido lo transformamos en json
    response = data.json();
    return response;
}

function parse_data_Barrios(barrios) {
    let selectBarrios = document.getElementById("barrios");
    barriosJson = barrios['barrios'];
    for (let i = 0; i < barriosJson.length; i++) {
        let optionBarrio = document.createElement("option");
        optionBarrio.value = barriosJson[i].Nombre;
        optionBarrio.innerText = barriosJson[i].Nombre;
        // console.log(barriosJson[i].Nombre);
        selectBarrios.appendChild(optionBarrio);
    }

}

function request_error_Barrios(error) {
    console.log("ERROR");
    console.log(error);
}

//tenemos que hacer los fetch para barrios
fetch(`http://localhost:5000/barrios`)
    .then(response_received_Barrios)
    .then(parse_data_Barrios)
    .catch(request_error_Barrios)

//funciones para el fetch de sexo
function response_received_s(data) {
    //al contenido obtenido lo transformamos en json
    response = data.json();
    return response;
}

function parse_data_s(sexos) {
    let selectSexos = document.getElementById("sexos");
    sexosJson = sexos['sexos'];
    for (let i = 0; i < sexosJson.length; i++) {
        let optionSexo = document.createElement("option");
        optionSexo.value = sexosJson[i].Nombre;
        optionSexo.innerText = sexosJson[i].Nombre;
        // console.log(barriosJson[i].Nombre);
        selectSexos.appendChild(optionSexo);
    }

}

function request_error_s(error) {
    console.log("ERROR");
    console.log(error);
}

//tenemos que hacer los fetch para barrios
fetch(`http://localhost:5000/sexo`)
    .then(response_received_s)
    .then(parse_data_s)
    .catch(request_error_s)


//funciones para el fetch de tipoAnimal
function response_received_tipo(data) {
    //al contenido obtenido lo transformamos en json
    response = data.json();
    return response;
}
function parse_data_tipo(tiposAnimal) {
    let tipoJson = tiposAnimal['tiposAnimal'];
    let selectTipo = document.getElementById("tipoAnimal");

    for (let i = 0; i < tipoJson.length; i++) {
        let option = document.createElement("option");
        option.value = tipoJson[i].Tipo;
        option.innerText = tipoJson[i].Tipo;
        selectTipo.append(option);
    }

}
function request_error_tipo(error) {
    console.log("ERROR");
    console.log(error);
}
//tenemos que hacer los fetch para barrios
fetch(`http://localhost:5000/tipoAnimal`)
    .then(response_received_tipo)
    .then(parse_data_tipo)
    .catch(request_error_tipo)