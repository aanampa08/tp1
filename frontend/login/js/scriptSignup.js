document.getElementById('formSignUp').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const username = document.getElementById('uname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;


    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    const nuevoUsuario = {
        nombre: name,
        nombreUsuario: username,
        telefono: phone,
        email: email,
        contraseña: password
    };

    const method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoUsuario)
    };


    fetch('http://localhost:5000/usuarios', method)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo crear el usuario');
            }
            return response.json();
        })
        .then(data => {
            console.log('Usuario creado:', data);
            alert('Usuario creado con éxito');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al crear el usuario');
        });
});


