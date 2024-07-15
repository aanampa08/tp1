

//funciones
function response_received(data) {
    //al contenido obtenido lo transformamos en json
    response = data.json();
    return response;
}

function parse_data(animales) {
    //tengo el contenido de los animales
    let contenidoAnimales = animales['animales'];
    let secAnimales = document.getElementById("sectionAnimales");

    let stylesheet = document.getElementById("idLink");
    let h2 = document.getElementById("titulo-user");
    if (user == "admin") {
        stylesheet.href = "./css/styleAdmin.css";
        h2.innerText = "Administrador";

        let divOpciones = document.createElement("div");
        divOpciones.className = "opcionesAnimal";

        let aAgregar = document.createElement("a");
        aAgregar.innerHTML = "<i class=" + '"fa-solid fa-plus fa-l"' + "style=" + '"color:white"' + "></i>Añadí";
        aAgregar.className = "agregaAnimal";

        aAgregar.href = "./animalNuevo/index.html";

        let selectTipo = document.createElement("select");
        selectTipo.name = "tipo";
        selectTipo.id = "tipoAnimal";
        let optionInicio = document.createElement("option");
        optionInicio.value = "inicio";
        optionInicio.innerText = "Tipo de animal";
        let optionTodos = document.createElement("option");
        optionTodos.value = "todos";
        optionTodos.innerText = "Todos"
        tipoAnimal();


        selectTipo.addEventListener('change', (event) => {
            //obtenemos el valor seleccionado de tipo de animal
            const valor = event.target.value;
            if (valor == "todos") {
                window.location.href = "./index.html?user=admin";
            }
            else if (valor == "Felino") {
                mostrarTipo(1);
            }
            else {
                mostrarTipo(2);
            }
        })

        let adoptionRequests = document.createElement("a");
        adoptionRequests.innerHTML = "Solicitudes de adopción";
        adoptionRequests.href = "../adopcion/adoptionRequests.html";
        adoptionRequests.className = "adoptionRequests";

        selectTipo.append(optionInicio);
        selectTipo.append(optionTodos);
        divOpciones.append(aAgregar);
        divOpciones.append(selectTipo);
        divOpciones.append(adoptionRequests);
        secAnimales.append(divOpciones);

        
    }
    else if (user == "usuario") {
        stylesheet.href = "./css/styleUsuario.css";
        h2.innerText = "Usuario";

        let divOpciones = document.createElement("div");
        divOpciones.className = "opcionesAnimal";

        let selectTipo = document.createElement("select");
        selectTipo.name = "tipo";
        selectTipo.id = "tipoAnimal";
        let optionInicio = document.createElement("option");
        optionInicio.value = "inicio";
        optionInicio.innerText = "Tipo de animal";
        let optionTodos = document.createElement("option");
        optionTodos.value = "todos";
        optionTodos.innerText = "Todos"
        tipoAnimal();
        selectTipo.addEventListener('change', (event) => {
            //obtenemos el valor seleccionado de tipo de animal
            const valor = event.target.value;
            if (valor == "todos") {
                window.location.href = "./index.html?user=usuario";
            }
            else if (valor == "Felino") {
                mostrarTipo(1);
            }
            else {
                mostrarTipo(2);
            }
        })

        selectTipo.append(optionInicio);
        selectTipo.append(optionTodos);
        divOpciones.append(selectTipo);
        secAnimales.append(divOpciones);
    }

    let divVistaA = document.createElement("div");
    divVistaA.className = "vistaAnimales";
    divVistaA.id = "idVistaA";
    for (let i = 0; i < contenidoAnimales.length; i++) {
        const animal = contenidoAnimales[i];

        if ((animal.Tipo === "Anios") && (animal.Edad == 1)) {
            animal.Tipo = "Año";
        } else if ((animal.Tipo === "Meses") && (animal.Edad == 1)) {
            animal.Tipo = "Mes";
        } else if ((animal.Tipo === "Dias") && (animal.Edad == 1)) {
            animal.Tipo = "Día";
        } else if ((animal.Tipo === "Anios")) {
            animal.Tipo = "Años";
        } else if ((animal.Tipo === "Dias")) {
            animal.Tipo = "Días";
        }

        if (user == "admin") {
            let divAnimal = document.createElement("div");
            divAnimal.className = "cardAnimal";

            let imagen = document.createElement("img");
            imagen.src = animal.Foto;

            let divCentrar = document.createElement("div");
            divCentrar.className = "centrar";
            let nombre = document.createElement("h3");
            nombre.innerText = animal.Nombre;

            divCentrar.append(nombre);

            let divEle = document.createElement("div");
            divEle.className = "elementos";
            let aNuevo = document.createElement("a");
            aNuevo.innerHTML = "<i class=" + '"fa-solid fa-pen-to-square"' + "></i>";

            aNuevo.setAttribute("href", `./animalEditar/index.html?idAnimal=${animal.id}`);

            let aTrash = document.createElement("a");
            aTrash.innerHTML = "<i class=" + '"fa-solid fa-trash"' + "></i>";
            aTrash.addEventListener('click', (event) => borrar_animal(event, animal.id));

            divEle.append(aNuevo);
            divEle.append(aTrash);

            let divInfo = document.createElement("div");
            divInfo.className = "infoAnimal";

            let divData = document.createElement("div");
            divData.className = "data";

            let pSexo = document.createElement("p");
            pSexo.innerHTML = `<b>${animal.Sexo}</b>`;

            let pEdad = document.createElement("p");
            pEdad.innerHTML = `<b>Edad: </b>${animal.Edad} ${animal.Tipo}`;

            let descripcion = document.createElement("p");
            descripcion.innerHTML = `<b>Descripcion: </b>${animal.Descripcion}`;

            let pBarrio = document.createElement("p");
            pBarrio.innerHTML = `<b>Barrio: </b>${animal.Barrio}`;

            let pInsta = document.createElement("p");
            pInsta.innerHTML = "<i class=\"fa-brands fa-instagram\" style=\"color:#000000; margin-right: 5px;\"></i>" + animal.Contacto;
            
            divAnimal.append(imagen);

            divAnimal.append(divCentrar);
            divCentrar.append(divEle);

            divData.append(pSexo);
            divData.append(pEdad);
            divInfo.append(divData);
            divAnimal.append(divInfo);
            divInfo.append(pBarrio);
            divInfo.append(descripcion);
            divInfo.append(pInsta);

            divVistaA.append(divAnimal);
            secAnimales.append(divVistaA);

        }
        else if (user == "usuario") {
            
                    let divAnimal = document.createElement("div");
                    divAnimal.className = "cardAnimal";

                    let imagen = document.createElement("img");
                    imagen.src = animal.Foto;

                    let divCentrar = document.createElement("div");
                    divCentrar.className = "centrar";

                    let nombre = document.createElement("h3");
                    nombre.innerText = animal.Nombre;

                    divCentrar.append(nombre);

                    let divEle = document.createElement("div");
                    divEle.className = "elementos";
                    let aAdopta = document.createElement("a");
                    aAdopta.innerHTML = "<i class=" + '"fa-regular fa-newspaper"' + "></i>";
                
                    aAdopta.setAttribute("href", `../login/login.html?idAnimal=${animal.id}`);

                    let aInfo = document.createElement("a");
                    aInfo.innerHTML = "<i class=" + '"fa-solid fa-circle-info"' + "></i>";
                    aInfo.setAttribute("href", `./verAnimal/index.html?idAnimal=${animal.id}`);

                    divEle.append(aAdopta);
                    divEle.append(aInfo);

                    let divInfo = document.createElement("div");
                    divInfo.className = "infoAnimal";

                    let divData = document.createElement("div");
                    divData.className = "data";

                    let pSexo = document.createElement("p");
                    pSexo.innerHTML = `<b>${animal.Sexo}</b>`;

                    let pEdad = document.createElement("p");
                    pEdad.innerHTML = `<b>Edad: </b>${animal.Edad} ${animal.Tipo}`;
                    let pBarrio = document.createElement("p");
                    pBarrio.innerHTML = `<b>Barrio: </b>${animal.Barrio}`;
                   
                    divAnimal.append(imagen);

                    divAnimal.append(divCentrar);
                    divCentrar.append(divEle);

                    divData.append(pSexo);
                    divData.append(pEdad);
                    divInfo.append(pBarrio);
                    divInfo.append(divData);
                    divAnimal.append(divInfo);
                    divVistaA.append(divAnimal);
                    secAnimales.append(divVistaA);
   
        }

    }
}

function request_error(error) {
    console.log(error);
}

function borrar_animal(event, id) {
    event.preventDefault();

    const confirmacion = confirm(`¿Está seguro de eliminar al animal con ID ${id}?`);
    if (!confirmacion) {
        return;
    }
    // window.location.href = "./index.html?user=admin";
    fetch(`http://localhost:5000/animal/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if(data['message']==false){
                alert('El animal tiene una solicitud de adopcion.No puede borrar el animal');
            }
            else{
                window.location.href = "./index.html?user=admin";
            }
        })
        .catch(error => {
            console.error(`Error al borrar el animal ${id}:`, error);
            alert('Error al intentar eliminar el animal. Inténtalo de nuevo más tarde.');
        });
}

const params = new URLSearchParams(window.location.search);
const user = params.get("user");

if (user == null) {
    //en caso de no existir dicho paramentro, REDIRECCIONO la pagina
    window.location.href = "./usuario/index.html";
}


fetch(`http://localhost:5000/animales`)
    .then(response_received)
    .then(parse_data)
    .catch(request_error)




function tipoAnimal() {
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
        
        console.log(error);
    }

    //tenemos que hacer los fetch para barrios
    fetch(`http://localhost:5000/tipoAnimal`)
        .then(response_received_tipo)
        .then(parse_data_tipo)
        .catch(request_error_tipo)
}

function mostrarTipo(tipo) {
    fetch(`http://localhost:5000/tipoAnimal/${tipo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontraron los animales');
            }
            return response.json();
        })
        .then(resultado => {
            let section = document.getElementById("sectionAnimales");
            let divVista = document.getElementById("idVistaA");
            //borramos lo que existe para poner lo nuevo
            divVista.innerHTML = "";
            contenidoAnimales=resultado['animales'];
            for (let i = 0; i < contenidoAnimales.length; i++) {
                const animal = contenidoAnimales[i];

                if ((animal.Tipo === "Anios") && (animal.Edad == 1)) {
                    animal.Tipo = "Año";
                } else if ((animal.Tipo === "Meses") && (animal.Edad == 1)) {
                    animal.Tipo = "Mes";
                } else if ((animal.Tipo === "Dias") && (animal.Edad == 1)) {
                    animal.Tipo = "Día";
                } else if ((animal.Tipo === "Anios")) {
                    animal.Tipo = "Años";
                } else if ((animal.Tipo === "Dias")) {
                    animal.Tipo = "Días";
                }

                if (user == "admin") {
                    let divAnimal = document.createElement("div");
                    divAnimal.className = "cardAnimal";

                    let imagen = document.createElement("img");
                    imagen.src = animal.Foto;

                    let divCentrar = document.createElement("div");
                    divCentrar.className = "centrar";

                    let nombre = document.createElement("h3");
                    nombre.innerText = animal.Nombre;

                    divCentrar.append(nombre);

                    let divEle = document.createElement("div");
                    divEle.className = "elementos";
                    let aNuevo = document.createElement("a");
                    aNuevo.innerHTML = "<i class=" + '"fa-solid fa-pen-to-square"' + "></i>";

                    aNuevo.setAttribute("href", `./animalEditar/index.html?idAnimal=${animal.id}`);

                    let aTrash = document.createElement("a");
                    aTrash.innerHTML = "<i class=" + '"fa-solid fa-trash"' + "></i>";
                    aTrash.addEventListener('click', (event) => borrar_animal(event, animal.id));

                    divEle.append(aNuevo);
                    divEle.append(aTrash);

                    let divInfo = document.createElement("div");
                    divInfo.className = "infoAnimal";

                    let divData = document.createElement("div");
                    divData.className = "data";

                    let pSexo = document.createElement("p");
                    pSexo.innerHTML = `<b>${animal.Sexo}</b>`;

                    let pEdad = document.createElement("p");
                    pEdad.innerHTML = `<b>Edad: </b>${animal.Edad} ${animal.Tipo}`;

                    let pBarrio = document.createElement("p");
                    pBarrio.innerHTML = `<b>Barrio: </b>${animal.Barrio}`;

                    let descripcion = document.createElement("p");
                    descripcion.innerHTML = `<b>Descripcion: </b>${animal.Descripcion}`;

                    let pInsta = document.createElement("p");
                    pInsta.innerHTML = "<i class=" + '"fa-brands fa-instagram"' + ' style="color:#00000;"' + "></i>" + `${animal.Contacto}`;

                    divAnimal.append(imagen);

                    divAnimal.append(divCentrar);
                    divCentrar.append(divEle);

                    divData.append(pSexo);
                    divData.append(pEdad);
                    divInfo.append(divData);
                    divInfo.append(pBarrio);
                    divAnimal.append(divInfo);
                    divInfo.append(descripcion);
                    divInfo.append(pInsta);
                    divVista.append(divAnimal);
                    section.append(divVista);

                }
                if(user == "usuario"){
                    let divAnimal = document.createElement("div");
                    divAnimal.className = "cardAnimal";

                    let imagen = document.createElement("img");
                    imagen.src = animal.Foto;

                    let divCentrar = document.createElement("div");
                    divCentrar.className = "centrar";

                    let nombre = document.createElement("h3");
                    nombre.innerText = animal.Nombre;

                    divCentrar.append(nombre);

                    let divEle = document.createElement("div");
                    divEle.className = "elementos";
                    let aAdopta = document.createElement("a");
                    aAdopta.innerHTML = "<i class=" + '"fa-regular fa-newspaper"' + "></i>";

                    aAdopta.setAttribute("href", `../adopcion/formAdopcion.html?idAnimal=${animal.id}`);

                    let aInfo = document.createElement("a");
                    aInfo.innerHTML = "<i class=" + '"fa-solid fa-circle-info"' + "></i>";
                    aInfo.setAttribute("href", `./verAnimal/index.html?idAnimal=${animal.id}`);

                    divEle.append(aAdopta);
                    divEle.append(aInfo);

                    let divInfo = document.createElement("div");
                    divInfo.className = "infoAnimal";

                    let divData = document.createElement("div");
                    divData.className = "data";

                    let pSexo = document.createElement("p");
                    pSexo.innerHTML = `<b>${animal.Sexo}</b>`;

                    let pEdad = document.createElement("p");
                    pEdad.innerHTML = `<b>Edad: </b>${animal.Edad} ${animal.Tipo}`;

                    let pBarrio = document.createElement("p");
                    pBarrio.innerHTML = `<b>Barrio: </b>${animal.Barrio}`;
                    divAnimal.append(imagen);

                    divAnimal.append(divCentrar);
                    divCentrar.append(divEle);

                    divData.append(pSexo);
                    divData.append(pEdad);
                    divInfo.append(divData);
                    divInfo.append(pBarrio);
                    divAnimal.append(divInfo);
                    divVista.append(divAnimal);
                    section.append(divVista);
                }
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
}