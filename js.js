// En el archivo script.js

document.addEventListener('DOMContentLoaded', function () {
    // Datos de ejemplo (puedes cargar estos datos desde una fuente externa)
    const historiaContenido = "Escribe tu historia aquí...";
    const fotosArray = ['foto1.jpg', 'foto2.jpg', 'foto3.jpg']; // Nombres de archivo de las fotos
    const fechasArray = ['Fecha 1', 'Fecha 2', 'Fecha 3']; // Fechas importantes

    // Rellenar secciones con contenido
    document.getElementById('historia').innerHTML = `<p>${historiaContenido}</p>`;



    const galeriaFotos = document.getElementById('fotos');
    fotosArray.forEach(foto => {
        galeriaFotos.innerHTML += `<img src="${foto}" alt="Foto">`;
    });

    const seccionFechas = document.getElementById('fechas');
    fechasArray.forEach(fecha => {
        seccionFechas.innerHTML += `<p>${fecha}</p>`;
    });
});
