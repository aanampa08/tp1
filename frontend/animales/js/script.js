//funciones
function response_received(data){
    //al contenido obtenido lo transformamos en json
    response= data.json();
    return response;
}

function parse_data(animales){
    //tengo el contenido de los animales
    let contenidoAnimales=animales['animales'];
    let secAnimales= document.getElementById("sectionAnimales");
    let stylesheet = document.getElementById("idLink");
    let h2= document.getElementById("titulo-user");
    if(user == "admin"){
        stylesheet.href="./css/styleAdmin.css";
        h2.innerText="Administrador";
        let divAgregar= document.createElement("div");
        divAgregar.className="agregarAnimal";

        //poner la ruta correcta para agregar 
        let aAgregar= document.createElement("a");
        aAgregar.href="./animalNuevo/index.html";
        divAgregar.append(aAgregar);

        let divPlus = document.createElement("div");
        divPlus.className="plus";

        aAgregar.append(divPlus);

        let iconPlus = document.createElement("i");
        iconPlus.className="fa-solid fa-plus";
        iconPlus.style.color="white";

        divPlus.append(iconPlus);

        let pAgrega = document.createElement("p");
        pAgrega.innerText="Añade una nueva huellita";
        aAgregar.append(pAgrega);
    
        secAnimales.append(divAgregar);
    }
    for(let i=0; i < contenidoAnimales.length; i++){
        const animal=contenidoAnimales[i];
        if (user == "admin"){
            secAnimales.className="secAnimales";
            let divAnimalAdmin=document.createElement("div");
            divAnimalAdmin.className="animalAdmin";

            //cosas a agregar
            let img = document.createElement("img");
            img.src=animal.Foto;
            let divInfo = document.createElement("div");
            divInfo.className="infoAnimal";
            let h3 = document.createElement("h3");
            h3.innerText=animal.Nombre;
            let divElementos= document.createElement("div");
            divElementos.className="elementos";
            
            let aEditar=document.createElement("a");
            let iEditar=document.createElement("i");
            iEditar.className="fa-solid fa-pen-to-square";
            iEditar.style.color="#3ed33c";

            let aBorrar=document.createElement("a");
            let iBorrar=document.createElement("i");
            iBorrar.className="fa-solid fa-trash";
            iBorrar.style.color="#ff0000";

            aBorrar.addEventListener('click',(event)=>borrar_animal(event,animal.id));

            let pSexo= document.createElement("p");
            let spanSexo=document.createElement("span");

            let textSexo=document.createTextNode(animal.Sexo);
            spanSexo.appendChild(textSexo);

            pSexo.appendChild(spanSexo);



            let pBarrio= document.createElement("p");
            let spanBarrio=document.createElement("span");
            spanBarrio.appendChild(document.createTextNode("Barrio: "));
            
            pBarrio.appendChild(spanBarrio);
            pBarrio.appendChild(document.createTextNode(` ${animal.Barrio}`));

           

            let pEdad= document.createElement("p");
            let spanEdad=document.createElement("span");
            
            let textEdad = document.createTextNode("Edad: ");
            let infoEdad =document.createTextNode(`${animal.Edad} ${animal.Tipo}`);
            spanEdad.appendChild(textEdad);
            
            pEdad.appendChild(spanEdad);

            pEdad.appendChild(infoEdad);

            

            let pDesc= document.createElement("p");
            let spanDesc=document.createElement("span");

            spanDesc.appendChild(document.createTextNode("Descripcion: "));
            pDesc.appendChild(spanDesc);
            pDesc.appendChild(document.createTextNode(`  ${animal.Descripcion}`));



            let pInsta = document.createElement("p");
            let iInsta = document.createElement("i");
            iInsta.className="fa-brands fa-instagram";
            iInsta.style.color="#000000";
            pInsta.appendChild(iInsta);
            let contacto=document.createTextNode(` ${animal.Contacto}`);
            pInsta.appendChild(contacto);
            
            divInfo.append(h3);
            divInfo.append(divElementos);
            aEditar.append(iEditar);
            aBorrar.append(iBorrar);
            divElementos.append(aEditar);
            divElementos.append(aBorrar);
            divInfo.append(pSexo);
            divInfo.append(pBarrio);
            divInfo.append(pEdad);
            divInfo.append(pDesc);
            divInfo.append(pInsta);
            
            
            divAnimalAdmin.append(img);
            divAnimalAdmin.append(divInfo);


            secAnimales.append(divAnimalAdmin);
        }
        else{
            console.log("usuario");
        }
        
    }  
}

function request_error(error){
    console.log("ERROR");
    console.log(error);
}

function borrar_animal(event,id){
    event.preventDefault();
    alert(`Borrar: ${id}`);
    //en esta parte se puede pedir el fetch
}

const params=new URLSearchParams(window.location.search);
const user= params.get("user");

if (user == null){
    //en caso de no existir dicho paramentro, REDIRECCIONO la pagina
    window.location.href="./usuario/index.html";
}
// console.log(user);

fetch(`http://localhost:5000/animales`)
.then(response_received)
.then(parse_data)
.catch(request_error)