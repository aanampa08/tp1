// -------------- FETCH POST PARA CREAR UN NUEVO USUARIO -----------------------------------------
document.getElementById('formularioNuevaHuella').addEventListener('submit', function (event) {
    // Evitar el envío del formulario
    event.preventDefault();
  
  
    // Consigo los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('numEdad').value;

    const tipoEdad = document.getElementById('tipoEdad').options[document.getElementById('tipoEdad').selectedIndex].text;
    
    const sexo = document.getElementById('sexos').options[document.getElementById('sexos').selectedIndex].text;
    const barrio = document.getElementById('barrios').options[document.getElementById('barrios').selectedIndex].text;
    // const barrio=document.get

    const descripcion = document.getElementById('descripcion').value;
    const foto = document.getElementById('urlImagen').value;
    const contacto = document.getElementById('idContacto').value;

    const nuevoAnimal = {
        nombre:nombre
        ,edad:edad
        ,tipoEdad:tipoEdad
        ,sexo:sexo
        ,descripcion:descripcion
        ,foto:foto
        ,contacto:contacto

    };
  
  
    // // Configuración de la solicitud
    // const method = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(nuevoAnimal)
    // };
  
  
    // // Hacer la solicitud POST
    // fetch('http://localhost:3000/animales', method)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('No se pudo crear el usuario');
    //     }
    //     return response.json();
    //   })
    //   .then(newUser => {
    //     console.log('Respuesta:', newUser);
    //     //aca se puede mostrar desde el index que se creo el usuario
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  });
  


//funciones para el fetch de barrios
function response_received_Barrios(data){
    //al contenido obtenido lo transformamos en json
    response= data.json();
    return response;
}

function parse_data_Barrios(barrios){
    let selectBarrios = document.getElementById("barrios");
    barriosJson=barrios['barrios'];
    for(let i=0; i < barriosJson.length; i++){
        let optionBarrio = document.createElement("option");
        optionBarrio.value=barriosJson[i].Nombre;
        optionBarrio.innerText=barriosJson[i].Nombre;
        // console.log(barriosJson[i].Nombre);
        selectBarrios.appendChild(optionBarrio);
    }
    
}

function request_error_Barrios(error){
    console.log("ERROR");
    console.log(error);
}

//tenemos que hacer los fetch para barrios
fetch(`http://localhost:5000/barrios`)
.then(response_received_Barrios)
.then(parse_data_Barrios)
.catch(request_error_Barrios)

//funciones para el fetch de sexo
function response_received_s(data){
    //al contenido obtenido lo transformamos en json
    response= data.json();
    return response;
}

function parse_data_s(sexos){
    let selectSexos = document.getElementById("sexos");
    sexosJson=sexos['sexos'];
    for(let i=0; i < sexosJson.length; i++){
        let optionSexo = document.createElement("option");
        optionSexo.value=sexosJson[i].Nombre;
        optionSexo.innerText=sexosJson[i].Nombre;
        // console.log(barriosJson[i].Nombre);
        selectSexos.appendChild(optionSexo);
    }
    
}

function request_error_s(error){
    console.log("ERROR");
    console.log(error);
}

//tenemos que hacer los fetch para barrios
fetch(`http://localhost:5000/sexo`)
.then(response_received_s)
.then(parse_data_s)
.catch(request_error_s)