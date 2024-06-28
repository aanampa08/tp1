//funciones
function response_received(data){
    console.log("SUCCESS");
    //al contenido obtenido lo transformamos en json
    response= data.json();
    return response;
}

function parse_data(content){
    //tengo el contenido de los testimonios
    console.log(content)
}

function request_error(error){
    console.log("ERROR");
    console.log(error);
}

function obtenerAnimales(){
    
    
}

// //programa principal
// fetch("http://127.0.0.1:5000/testimonios")
// .then(response_received)
// .then(parse_data)
// .catch(request_error)

document.addEventListener('DOMContentLoaded', (event) => {
    const btnAdopcion = document.getElementById("btnAdopcion");
    btnAdopcion.addEventListener("click", (e) => {
        window.location.href = "usuario/index.html";

    });
});