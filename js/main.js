// main.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado y analizado');

    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('header'); // Selector del elemento header
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    // Funcionalidad del menú hamburguesa para móviles
    if (navbarToggle && navbarLinks) {
        navbarToggle.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
            // Cambiar ícono de hamburguesa a X y viceversa
            const icon = navbarToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Funcionalidad para cambiar el navbar de transparente a sólido en index.html
    // y manejar la clase 'header-fixed' para otras páginas.
    if (header && header.classList.contains('header-transparent')) { // Solo si es el header de index
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Cambia a sólido después de 50px de scroll
                header.classList.add('scrolled');
                // Si necesitas cambiar el logo o colores de links, hazlo aquí con clases adicionales
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Lógica para marcar el enlace activo (ya se hace con CSS y una clase 'active' en el HTML)
    // Podríamos añadir JS para hacerlo más dinámico si fuera necesario,
    // pero para un esqueleto, la clase 'active' en el HTML es suficiente.
    // Ejemplo:
    // const currentPath = window.location.pathname.split("/").pop() || "index.html";
    // const navLinks = document.querySelectorAll('.navbar-links a');
    // navLinks.forEach(link => {
    //     if (link.getAttribute('href') === currentPath) {
    //         link.classList.add('active');
    //     } else {
    //         link.classList.remove('active');
    //     }
    // });


    // Placeholder para futuras funciones JS

    // --- Funcionalidad de la Galería ---
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const modal = document.getElementById('galeriaModal');
    const modalImage = document.getElementById('modalImage');
    // const modalCaption = document.getElementById('modalCaption'); // Ya no se usa
    const closeModalBtn = document.querySelector('.modal-close'); // Renombrado para claridad
    const navbarLinksForGallery = document.querySelector('.navbar-links'); // Para chequear si el menú está activo

    if (modal) { // Asegurarse que el modal existe en la página actual
        galeriaItems.forEach(item => {
            item.addEventListener('click', (event) => {
                // Prevenir que el clic se propague, podría ayudar si hay elementos anidados.
                event.stopPropagation();

                // Condición Adicional: No abrir el modal si el menú hamburguesa está activo.
                if (navbarLinksForGallery && navbarLinksForGallery.classList.contains('active')) {
                    // Opcional: cerrar el menú si se hace clic en un item de galería mientras el menú está abierto
                    // navbarLinksForGallery.classList.remove('active');
                    // const icon = document.querySelector('.navbar-toggle i');
                    // if (icon) {
                    //     icon.classList.remove('fa-times');
                    //     icon.classList.add('fa-bars');
                    // }
                    return; // No hacer nada más si el menú está activo
                }

                // Asegurarse de que el clic fue directamente en el item o un descendiente cercano,
                // y no en algo que esté sobre él accidentalmente.
                // 'currentTarget' es el elemento al que se adjuntó el listener (el .galeria-item)
                if (event.currentTarget === item) {
                    modal.style.display = "flex"; // Usar flex para el centrado
                    modalImage.src = item.dataset.largeSrc;
                    // modalCaption.innerHTML = item.dataset.description || ''; // Ya no se usa
                }
            });
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modal.style.display = "none";
            });
        }

        // Cerrar modal al hacer clic fuera de la imagen (en el fondo del modal)
        modal.addEventListener('click', (event) => { // Cambiado de window a modal
            if (event.target === modal) { // Solo si el clic es directamente en el fondo del modal
                modal.style.display = "none";
            }
        });
    }

    // --- Simulación de Filtros de Galería ---
    const filtroButtons = document.querySelectorAll('.btn-filter');
    if (filtroButtons.length > 0 && galeriaItems.length > 0) {
        filtroButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Manejar clase activa en botones
                filtroButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;

                galeriaItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.remove('hidden');
                        // Podríamos añadir una animación de entrada aquí si quisiéramos
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // --- Funcionalidad del Botón "Ir Arriba" ---
    const goTopBtn = document.getElementById('go-top-btn');

    if (goTopBtn) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                goTopBtn.classList.add('show');
            } else {
                goTopBtn.classList.remove('show');
            }
        });

        goTopBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir el comportamiento por defecto del ancla
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Document.documentElement.scrollTop = 0; // Para navegadores viejos sin smooth scroll
        });
    }

    // Comentarios en JS: Se han ido añadiendo.
    // Ejemplo:
    // Funcion para X tarea, recibe Y parametros.

// Ajuste final para asegurar que el evento DOMContentLoaded cierra correctamente
});
