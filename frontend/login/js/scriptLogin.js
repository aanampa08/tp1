
window.onload = function() {
    const idAnimal = new URLSearchParams(window.location.search).get("idAnimal");
    document.getElementById('crearCuenta').href = `./signup.html?idAnimal=${idAnimal}`;
};

document.getElementById('formLogIn').addEventListener('submit', function (event) {
    event.preventDefault();

    

    const username = document.getElementById('uname').value;
    const password = document.getElementById('password').value;

    const logInUsuario = {
        nombreUsuario: username,
        contraseña: password
    };

    const method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(logInUsuario)
    };


    fetch('http://localhost:5000/login', method)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo iniciar sesion');
            }
            return response.json();
        })
        .then(data => {
            console.log('Usuario :', data);
            const idAnimal =  new URLSearchParams(window.location.search).get("idAnimal");
            window.location.href = `../adopcion/formAdopcion.html?username=${username}&idAnimal=${idAnimal}`
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Usuario o contraseña incorrecta');
        });
});
