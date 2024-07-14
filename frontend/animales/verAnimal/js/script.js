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
            console.log(idAnimal);
            const dataAnimal= animal["animal"];
            // console.log(dataAnimal);
            const divVista = document.getElementById("secVistaAnimal");

            let divAnimal = document.createElement("div");
            divAnimal.className = "card mb-3 custom-card";

            let imagen = document.createElement("img");
            imagen.src = dataAnimal.Foto;
            imagen.className = "card-img-top";

            let divCardBody = document.createElement("div");
            divCardBody.className = "card-body";

            let nombre = document.createElement("h3");
            nombre.className = "card-title";
            nombre.innerText = dataAnimal.Nombre;

            let divInfo = document.createElement("div");
            divInfo.className = "infoAnimal";

            let pSexo = document.createElement("p");
            pSexo.innerHTML = `<b>Sexo:</b> ${dataAnimal.Sexo}`;

            let pEdad = document.createElement("p");
            pEdad.innerHTML = `<b>Edad:</b> ${dataAnimal.Edad} ${dataAnimal.TipoEdad}`;

            let descripcion = document.createElement("p");
            descripcion.innerHTML = `<b>Descripción:</b> ${dataAnimal.Descripcion}`;

            let pInsta = document.createElement("p");
            pInsta.innerHTML = `<i class="fab fa-instagram"></i> ${dataAnimal.Contacto}`;

            divCardBody.appendChild(nombre);
            divCardBody.appendChild(divInfo);
            divInfo.appendChild(pSexo);
            divInfo.appendChild(pEdad);
            divInfo.appendChild(descripcion);
            divInfo.appendChild(pInsta);
            divAnimal.appendChild(imagen);
            divAnimal.appendChild(divCardBody);
            divVista.appendChild(divAnimal);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
