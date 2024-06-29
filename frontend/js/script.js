document.addEventListener('DOMContentLoaded', (event) => {
    const btnAdopcion = document.getElementById("btnAdopcion");
    btnAdopcion.addEventListener("click", (e) => {
        window.location.href = "usuario/index.html";
    });
});

var swiper = new Swiper(".testimonios-slider", {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
    },
});