//funciones
function response_received(data){
    console.log("SUCCESS");
    //al contenido obtenido lo transformamos en json
    response= data.json();
    return response;
}

function parse_data(animales){
    //tengo el contenido de los testimonios
    console.log(animales);
}

function request_error(error){
    console.log("ERROR");
    console.log(error);
    console.log("entro aca")
}


const params=new URLSearchParams(window.location.search);
const user= params.get("user");

if (user == null){
    //en caso de no existir dicho paramentro, REDIRECCIONO la pagina
    window.location.href="./usuario/index.html";
}
console.log(user);

fetch(`http://localhost:5000/animales/${user}`)
.then(response_received)
.then(parse_data)
.catch(request_error)