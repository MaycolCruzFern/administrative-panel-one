function limpiarClases() {
    const layout = document.querySelector(".layout-principal");
    layout.classList.remove("contraido", "contraido-hover", "sidebar-activa");
}

function activarEventos() {
    limpiarClases(); // Limpia clases antes de aplicar el modo

    if(window.matchMedia("(max-width: 850px)").matches) {
        // MODO MÓVIL
        let menuBtn = document.querySelector('.menu-btn');
        menuBtn.onclick = function() {
            const layout = document.querySelector(".layout-principal");
            layout.classList.toggle("sidebar-activa");
        };

        document.onclick = function(event) {
            const layout = document.querySelector(".layout-principal");
            const barraLateral = document.querySelector('.barra-lateral');
            const menuBtn = document.querySelector('.menu-btn');
            if (!barraLateral.contains(event.target) && !menuBtn.contains(event.target)) {
                layout.classList.remove("sidebar-activa");
            }
        };

        document.querySelectorAll('.menu-item > .enlace-item').forEach(function(enlace) {
            enlace.onclick = function(e) {
                e.preventDefault();
                const submenu = this.parentElement.querySelector('.submenu');
                const icono = this.querySelector('.fa-angle-up');
                if (submenu) {
                    submenu.classList.toggle('submenu-activo');
                    if (icono) {
                        icono.classList.toggle('fa-rotate-180');
                    }
                }
            };
        });

    } else {
        // MODO ESCRITORIO
        document.querySelectorAll('.menu-item > .enlace-item').forEach(function(enlace) {
            enlace.onclick = function(e) {
                e.preventDefault();
                const submenu = this.parentElement.querySelector('.submenu');
                const icono = this.querySelector('.fa-angle-up');
                if (submenu) {
                    submenu.classList.toggle('submenu-activo');
                    if (icono) {
                        icono.classList.toggle('fa-rotate-180');
                    }
                }
            };
        });

        let menuBtn = document.querySelector('.menu-btn');
        menuBtn.onclick = function() {
            const layout = document.querySelector(".layout-principal");
            layout.classList.toggle("contraido");
            if (layout.classList.contains("contraido")) {
                document.querySelectorAll('.submenu.submenu-activo').forEach(submenu => {
                    submenu.classList.remove('submenu-activo');
                    const icono = submenu.parentElement.querySelector('.fa-angle-up');
                    if (icono) {
                        icono.classList.remove('fa-rotate-180');
                    }
                });
            }
        };

        const barraLateral = document.querySelector('.barra-lateral');
        const layout = document.querySelector('.layout-principal');

        barraLateral.onmouseenter = function() {
            if (layout.classList.contains('contraido')) {
                layout.classList.add('contraido-hover');
            }
        };
        barraLateral.onmouseleave = function() {
            layout.classList.remove('contraido-hover');
            if (layout.classList.contains('contraido')) {
                document.querySelectorAll('.submenu.submenu-activo').forEach(submenu => {
                    submenu.classList.remove('submenu-activo');
                    const icono = submenu.parentElement.querySelector('.fa-angle-up');
                    if (icono) {
                        icono.classList.remove('fa-rotate-180');
                    }
                });
            }
        };
    }
}

// Ejecuta al cargar
activarEventos();

// Ejecuta cada vez que cambie el tamaño de la ventana
window.addEventListener('resize', activarEventos);