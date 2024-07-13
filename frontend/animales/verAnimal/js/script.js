const params=new URLSearchParams(window.location.search);
const idAnimal= params.get("idAnimal");
console.log(idAnimal)

fetch(`http://localhost:5000/animal/${idAnimal}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontraron los animales');
            }
            return response.json();
        })
        .then(resultado => {
            console.log(resultado);
            //aca se debe ir armando la card

        })
        .catch(error => {
            console.error('Error:', error);
        });
