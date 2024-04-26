document.addEventListener("DOMContentLoaded", function() {
    const canales = [
        { nombre: "Canal 1", fondo: "img/hbo.jpg.png",},
        { nombre: "Canal 2", fondo: "img/homer.jpg.webp"},
        { nombre: "Canal 3", fondo: "img/willy.jpg" },
        { nombre: "Canal 4", fondo: "video/descarga.htm" },
        { nombre: "Canal 5", fondo: "img/willy.jpg" },
        { nombre: "Canal 6", fondo: "img/willy.jpg" },
        // Agrega más canales si es necesario
    ];

    let indiceCanalActual = 0;
    let estaEncendida = false; // Cambiado a false inicialmente
    let nivelVolumen = 100;

    const elementoNombreCanal = document.getElementById("nombre-canal");
    const elementoPantallaTV = document.getElementById("tv-screen");
    const elementoVolumen = document.getElementById("volumen");
    const botonEncendido = document.querySelector(".encendido");
    const botonSubirVolumen = document.querySelector(".subir-volumen");
    const botonBajarVolumen = document.querySelector(".bajar-volumen");
    const botonMenu = document.querySelector(".btn-menu");
    const elementoMenu = document.querySelector(".menu");

    elementoNombreCanal.textContent = "";
    elementoPantallaTV.style.backgroundImage = "none";
    elementoPantallaTV.style.backgroundColor = "#000";
    elementoVolumen.style.display = "none";
    elementoMenu.classList.add("oculto");
    // Limpiar pantalla y ocultar menú al cargar la página
    

    function cambiarCanal(direccion) {
        if (direccion === "subir") {
            indiceCanalActual = (indiceCanalActual + 1) % canales.length;
        } else {
            indiceCanalActual = (indiceCanalActual - 1 + canales.length) % canales.length;
        }

        const canalActual = canales[indiceCanalActual];
        elementoNombreCanal.textContent = canalActual.nombre;
        if (canalActual.fondo !== "") {
            elementoPantallaTV.style.backgroundImage = `url(${canalActual.fondo})`;
            elementoPantallaTV.style.backgroundSize = "cover"; // Ajustamos el tamaño de la imagen
        } else {
            elementoPantallaTV.style.backgroundImage = "none";
            elementoPantallaTV.style.backgroundColor = "#000";
        }
    }

    function cambiarEstadoTV() {
        estaEncendida = !estaEncendida;
        if (estaEncendida) {
            cambiarCanal("subir");
            botonEncendido.innerHTML = '<i class="fas fa-power-off"></i>';
            elementoVolumen.style.display = "block";
            elementoMenu.classList.add("oculto");
        } else {
            elementoNombreCanal.textContent = "";
            elementoPantallaTV.style.backgroundImage = "none";
            elementoPantallaTV.style.backgroundColor = "#000";
            elementoVolumen.style.display = "none";
            botonEncendido.innerHTML = '<i class="fas fa-power-on"></i>';
        }
    }

    function aumentarVolumen() {
        if (nivelVolumen < 100) {
            nivelVolumen += 10;
            actualizarVisualizacionVolumen();
        }
    }

    function disminuirVolumen() {
        if (nivelVolumen > 0) {
            nivelVolumen -= 10;
            actualizarVisualizacionVolumen();
        }
    }

    function actualizarVisualizacionVolumen() {
        elementoVolumen.textContent = "Volumen: " + nivelVolumen;
    }

    function alternarMenu() {
        elementoMenu.classList.toggle("oculto");
    }

    botonEncendido.addEventListener("click", function() {
        cambiarEstadoTV();
    });

    botonSubirVolumen.addEventListener("click", function() {
        aumentarVolumen();
    });

    botonBajarVolumen.addEventListener("click", function() {
        disminuirVolumen();
    });

    botonMenu.addEventListener("click", function() {
        alternarMenu();
    });

    const botonSubirCanal = document.querySelector(".subir-canal");
    const botonBajarCanal = document.querySelector(".bajar-canal");

    botonSubirCanal.addEventListener("click", function() {
        if (estaEncendida) {
            cambiarCanal("subir");
        }
    });

    botonBajarCanal.addEventListener("click", function() {
        if (estaEncendida) {
            cambiarCanal("bajar");
        }
    });
});
