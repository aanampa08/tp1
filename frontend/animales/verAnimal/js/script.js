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
            console.log(animal["animal"].Barrio, animal["animal"].Sexo, animal["animal"].Contacto, animal["animal"].Edad,animal["animal"].Descripcion,animal["animal"].Nombre, animal["animal"].Foto, animal["animal"].Tipo); 

            const divVista = document.getElementById("secVistaAnimal");

            let divAnimal = document.createElement("div");
            divAnimal.className = "card mb-3 custom-card";

            let imagen = document.createElement("img");
            imagen.src = animal.Foto;
            imagen.className = "card-img-top";

            let divCardBody = document.createElement("div");
            divCardBody.className = "card-body";

            let nombre = document.createElement("h3");
            nombre.className = "card-title";
            nombre.innerText = animal.Nombre;

            let divInfo = document.createElement("div");
            divInfo.className = "infoAnimal";

            let pSexo = document.createElement("p");
            pSexo.innerHTML = `<b>Sexo:</b> ${animal.Sexo}`;

            let pEdad = document.createElement("p");
            pEdad.innerHTML = `<b>Edad:</b> ${animal.Edad} ${animal.Tipo}`;

            let descripcion = document.createElement("p");
            descripcion.innerHTML = `<b>Descripción:</b> ${animal.Descripcion}`;

            let pInsta = document.createElement("p");
            pInsta.innerHTML = `<i class="fab fa-instagram"></i> ${animal.Contacto}`;

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
