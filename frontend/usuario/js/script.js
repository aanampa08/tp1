document.addEventListener('DOMContentLoaded', (event) => {
    const btnUser = document.getElementById("usuario");
    btnUser.addEventListener("click",(e)=>{
        //aca debemos linkear la pagina de los perritos solo para verlos
        //con la oportunidad de un forms
        btnUser.setAttribute("href","/animales?user=usuario");
        
    });

    const btnAdmin = document.getElementById("admin");
    btnAdmin.addEventListener("click",(e)=>{
        //aca debemos linkear la pagina de los perritos con posibilidad de editar
        btnAdmin.setAttribute("href","/animales?user=admin");
    });
});