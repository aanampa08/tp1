
function conseguirIdAnimal(){
    const params = new URLSearchParams(window.location.search) 
    return params.get("idAnimal");
}


function cargarDatos(){
    const idAnimal = conseguirIdAnimal();
    fetch(`http://localhost:5000/animal/${idAnimal}`)
    .then(response => response.json())
    .then(datos => {
        if (datos.animal) {
            document.getElementById('nombre').value = datos.animal.Nombre;
            document.getElementById('edad').value = datos.animal.Edad;
            document.getElementById('descripcion').value = datos.animal.Descripcion;
            document.getElementById('foto').value = datos.animal.Foto;
            document.getElementById('contacto').value = datos.animal.Contacto;
            document.getElementById('sexos').value = datos.animal.Sexo;
            document.getElementById('barrios').value = datos.animal.Barrio;

            let selecTipoEdad = document.getElementById('tipoEdad');
            switch(datos.animal.Tipo){
                case 'Anios':
                    selecTipoEdad.value = 'Anios';
                    break;
                case 'Meses':
                    selecTipoEdad.value = 'Meses';
                    break;
                case 'Dias':
                    selecTipoEdad.value = 'Dias';
                    break;
                default:
                    selecTipoEdad.value = 'inicio';
                    break;
            }
            
        } 
        else {
            alert("Error");
        }
    })
    .catch((error) => console.log("Eror al buscar campos cargados:", error));
        
}


//funciones para el fetch de barrios
function response_received_barrios(data){
    //al contenido obtenido lo transformamos en json
    response= data.json();
    return response;
}

function parse_data_barrios(barrios){
    let selectBarrios = document.getElementById("barrios");
    barriosJson=barrios['barrios'];
    for(let i=0; i < barriosJson.length; i++){
        let optionBarrio = document.createElement("option");
        optionBarrio.value=barriosJson[i].Nombre;
        optionBarrio.innerText=barriosJson[i].Nombre;
        selectBarrios.appendChild(optionBarrio);
    } 
    cargarDatos();       
}

function request_error_barrios(error){
    console.log("Error buscando la información del sexo del animalROR");
    console.log(error);
}

    //tenemos que hacer los fetch para barrios
fetch(`http://localhost:5000/barrios`)
.then(response_received_barrios)
.then(parse_data_barrios)
.catch(request_error_barrios)


//funciones para el fetch de sexo
function response_received_sexo(data){
    //al contenido obtenido lo transformamos en json
    response= data.json();
    return response;
}

function parse_data_sexo(sexos){
    let selectSexos = document.getElementById("sexos");
    sexosJson=sexos['sexos'];
    for(let i=0; i < sexosJson.length; i++){
        let optionSexo = document.createElement("option");
        optionSexo.value=sexosJson[i].Nombre;
        optionSexo.innerText=sexosJson[i].Nombre;
        selectSexos.appendChild(optionSexo);
    }
    cargarDatos();
}

function request_error_sexo(error){
    console.log("Error buscando la información del sexo del animal");
    console.log(error);
}

// que los fetch para sexo
fetch(`http://localhost:5000/sexo`)
.then(response_received_sexo)
.then(parse_data_sexo)
.catch(request_error_sexo)




function editarAnimal() {
    const idAnimal = conseguirIdAnimal();
    const datosAnimal = {
        nombre: document.getElementById('nombre').value, 
        edad: document.getElementById('edad').value,
        tipoEdad: document.getElementById('tipoEdad').value,
        descripcion: document.getElementById('descripcion').value,
        foto: document.getElementById('foto').value,
        contacto: document.getElementById('contacto').value,
        sexo : document.getElementById('sexos').value,
        barrio : document.getElementById('barrios').value

    };
    
    fetch(`http://localhost:5000/animal/${idAnimal}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosAnimal)
    })
    .then(response => response.json())
    .then(datos => {
        if (datos.animal) {
            alert(`Animal ${idAnimal} editado con exito!`)
            //Si se edita correctamente el animal, te devuelve a la página de animales
            window.location.href = '/animales/index.html?user=admin';

        } else {
            alert("Error: Asegurese de haber elegido un sexo y barrio");
        }
    })
    .catch((error) => console.log("ERROR", error));

    
}


//carga los datos actuales al form antes de la modificacion
window.addEventListener('load', cargarDatos);


