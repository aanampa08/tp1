document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const idAnimal = params.get("idAnimal");

    fetch(`http://localhost:5000/animal/${idAnimal}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontraron los animales');
            }
            return response.json();
        })
        .then(animal => {
            const dataAnimal = animal["animal"];
            const divVista = document.getElementById("secVistaAnimal");

            if ((dataAnimal.TipoEdad === "Anios") && (dataAnimal.Edad == 1)) {
                dataAnimal.TipoEdad = "Año";
            } else if ((dataAnimal.TipoEdad === "Meses") && (dataAnimal.Edad == 1)) {
                dataAnimal.TipoEdad = "Mes";
            } else if ((dataAnimal.TipoEdad === "Dias") && (dataAnimal.Edad == 1)) {
                dataAnimal.TipoEdad = "Día";
            } else if ((dataAnimal.TipoEdad === "Anios")) {
                dataAnimal.TipoEdad = "Años";
            } else if ((dataAnimal.TipoEdad === "Dias")) {
                dataAnimal.TipoEdad = "Días";
            }

            let divAnimal = document.createElement("div");
            divAnimal.className = "card mb-3 custom-card";

            let divRow = document.createElement("div");
            divRow.className = "row g-0";

            let divCol_md_4 = document.createElement("div");
            divCol_md_4.className = "col-md-4";

            let imagen = document.createElement("img");
            imagen.src = dataAnimal.Foto;
            imagen.className = "card-img-top";

            divCol_md_4.appendChild(imagen);

            let divCol_md_8 = document.createElement("div");
            divCol_md_8.className = "col-md-8";

            let divCardBody = document.createElement("div");
            divCardBody.className = "card-body";

            let nombre = document.createElement("h3");
            nombre.className = "card-title";
            nombre.innerText = dataAnimal.Nombre;

            let divInfo = document.createElement("div");
            divInfo.className = "infoAnimal";

            let pBarrio = document.createElement("p");
            pBarrio.innerHTML = `<b>Barrio:</b> ${dataAnimal.Barrio}`;

            let pSexo = document.createElement("p");
            pSexo.innerHTML = `<b>Sexo:</b> ${dataAnimal.Sexo}`;

            let pEdad = document.createElement("p");
            pEdad.innerHTML = `<b>Edad:</b> ${dataAnimal.Edad} ${dataAnimal.TipoEdad}`;

            let descripcion = document.createElement("p");
            descripcion.innerHTML = `<b>Descripción:</b> ${dataAnimal.Descripcion}`;

            let pInsta = document.createElement("p");
            pInsta.innerHTML = `<i class="fab fa-instagram"></i> ${dataAnimal.Contacto}`;

            let button = document.createElement("button");
            button.innerText = `Quiero adoptar a ${dataAnimal.Nombre}`;
            button.className = "btn btn-primary"; 
            button.addEventListener("click", function() {
                window.location.href =  `../../login/login.html?idAnimal=${idAnimal}`;
            });

            divCardBody.appendChild(nombre);
            divCardBody.appendChild(divInfo);
            divInfo.appendChild(pBarrio);
            divInfo.appendChild(pSexo);
            divInfo.appendChild(pEdad);
            divInfo.appendChild(descripcion);
            divInfo.appendChild(pInsta);
            divCardBody.appendChild(button); 
            divRow.appendChild(divCol_md_4);
            divRow.appendChild(divCol_md_8);
            divCol_md_8.appendChild(divCardBody);
            divAnimal.appendChild(divRow);
            divVista.appendChild(divAnimal);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
