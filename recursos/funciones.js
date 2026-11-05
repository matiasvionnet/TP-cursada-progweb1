window.addEventListener('load', iniciar);

function iniciar() {
    iniciarMenu();
    iniciarFormulario();
    iniciarGaleria();
    iniciarTransiciones();
}

/* ==========================================================
   1. MENÚ TÁCTIL MÓVIL
========================================================== */

function iniciarMenu() {
    var botonMenu = document.getElementById('btn-menu');
    var menu = document.getElementById('menu');

    if (!botonMenu || !menu) {
        return;
    }

    botonMenu.addEventListener('click', toggleMenu);

    // Al elegir una opción, el menú se vuelve a cerrar
    var enlaces = menu.getElementsByTagName('a');
    for (var i = 0; i < enlaces.length; i++) {
        enlaces[i].addEventListener('click', cerrarMenu);
    }
}

function toggleMenu() {
    var botonMenu = document.getElementById('btn-menu');
    var menu = document.getElementById('menu');

    var abierto = menu.classList.toggle('activo');
    botonMenu.classList.toggle('activo', abierto);
    botonMenu.setAttribute('aria-expanded', abierto);
    botonMenu.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
}

function cerrarMenu() {
    var botonMenu = document.getElementById('btn-menu');
    var menu = document.getElementById('menu');

    menu.classList.remove('activo');
    botonMenu.classList.remove('activo');
    botonMenu.setAttribute('aria-expanded', 'false');
    botonMenu.setAttribute('aria-label', 'Abrir menú');
}

/* ==========================================================
   2. VALIDACIÓN VISUAL DEL FORMULARIO DE CONTACTO
========================================================== */

var MENSAJES_ERROR = {
    nombre: 'Ingresá tu nombre (mínimo 2 caracteres).',
    email: 'Ingresá un email válido, por ejemplo tu@email.com.',
    telefono: 'Ingresá un teléfono válido (números, +, espacios o guiones).',
    asunto: 'Seleccioná un asunto.',
    mensaje: 'El mensaje debe tener al menos 10 caracteres.'
};

function iniciarFormulario() {
    var formulario = document.querySelector('.formulario');

    if (!formulario) {
        return;
    }

    var campos = formulario.querySelectorAll('input, select, textarea');

    for (var i = 0; i < campos.length; i++) {
        var campo = campos[i];

        // Cada campo recibe un espacio para su mensaje de error
        var aviso = document.createElement('span');
        aviso.className = 'mensaje-error';
        aviso.id = 'error-' + campo.id;
        campo.setAttribute('aria-describedby', aviso.id);
        campo.parentNode.appendChild(aviso);

        // Validación en tiempo real
        campo.addEventListener('input', validarCampo);
        campo.addEventListener('change', validarCampo);
        campo.addEventListener('blur', validarCampo);
    }

    formulario.addEventListener('submit', enviarFormulario);
}

// Callback de los eventos input / change / blur
function validarCampo(evento) {
    validarUnCampo(evento.target);
}

// Devuelve true si el campo es correcto y actualiza su aspecto visual
function validarUnCampo(campo) {
    var aviso = document.getElementById('error-' + campo.id);
    var texto = campo.value.trim();
    var largoMinimo = campo.minLength > 0 ? campo.minLength : 0;

    var valido = texto.length > 0 &&
                 texto.length >= largoMinimo &&
                 campo.checkValidity();

    // Si el usuario corrige el dato, el error se quita solo
    campo.classList.toggle('campo-error', !valido);
    campo.classList.toggle('campo-valido', valido);
    campo.setAttribute('aria-invalid', !valido);
    aviso.textContent = valido ? '' : MENSAJES_ERROR[campo.id];

    return valido;
}

function enviarFormulario(evento) {
    evento.preventDefault();

    var formulario = evento.target;
    var campos = formulario.querySelectorAll('input, select, textarea');
    var estado = document.getElementById('estado-formulario');
    var primerInvalido = null;

    for (var i = 0; i < campos.length; i++) {
        if (!validarUnCampo(campos[i]) && primerInvalido === null) {
            primerInvalido = campos[i];
        }
    }

    if (primerInvalido !== null) {
        estado.textContent = 'Revisá los campos marcados en rojo.';
        estado.className = 'estado-formulario error';
        primerInvalido.focus();
        return;
    }

    estado.textContent = '¡Gracias! Tu mensaje fue enviado correctamente.';
    estado.className = 'estado-formulario exito';
    formulario.reset();
    limpiarEstadoCampos(campos);
}

function limpiarEstadoCampos(campos) {
    for (var i = 0; i < campos.length; i++) {
        campos[i].classList.remove('campo-error', 'campo-valido');
        campos[i].removeAttribute('aria-invalid');
        document.getElementById('error-' + campos[i].id).textContent = '';
    }
}

/* ==========================================================
   3. CATÁLOGO INTERACTIVO DE LA GALERÍA
========================================================== */

var FOTOS = [
    { archivo: 'imagenes/automoviles/JDM Meet sin marca (105 de 209).jpg', categoria: 'automoviles', nombre: 'JDM Meet', alt: 'Automóvil', etiquetas: 'jdm auto coche japones encuentro' },
    { archivo: 'imagenes/automoviles/JDM Meet sin marca (107 de 209).jpg', categoria: 'automoviles', nombre: 'JDM Meet', alt: 'Automóvil JDM', etiquetas: 'jdm auto coche japones encuentro' },
    { archivo: 'imagenes/automoviles/JDM Meet sin marca (177 de 209).jpg', categoria: 'automoviles', nombre: 'JDM Meet', alt: 'Fotografía de automóviles', etiquetas: 'jdm auto coche japones encuentro' },
    { archivo: 'imagenes/comida/Mafia (100 de 102).jpg', categoria: 'comida', nombre: 'Mafia', alt: 'Fotografía gastronómica', etiquetas: 'gastronomia plato restaurante' },
    { archivo: 'imagenes/comida/Mafia (16 de 102).jpg', categoria: 'comida', nombre: 'Mafia', alt: 'Fotografía gastronómica', etiquetas: 'gastronomia plato restaurante' },
    { archivo: 'imagenes/moda/Portfolio (48 de 167).jpg', categoria: 'moda', nombre: 'Portfolio', alt: 'Fotografía de moda', etiquetas: 'modelo retrato estilo' },
    { archivo: 'imagenes/moda/Mai (102 de 106).jpg', categoria: 'moda', nombre: 'Mai', alt: 'Fotografía de moda', etiquetas: 'modelo retrato estilo' },
    { archivo: 'imagenes/autor/El bueno.jpg', categoria: 'autor', nombre: 'El bueno', alt: 'Fotografía de autor', etiquetas: 'retrato fotografo matias' },
    { archivo: 'imagenes/autor/cba (4 de 5).jpg', categoria: 'autor', nombre: 'Córdoba', alt: 'Fotografía de autor', etiquetas: 'retrato fotografo cba cordoba' }
];

var categoriaActual = 'todos';
var textoBusqueda = '';

function iniciarGaleria() {
    var contenedor = document.getElementById('galeria');

    if (!contenedor) {
        return;
    }

    var botones = document.querySelectorAll('.filtro');
    for (var i = 0; i < botones.length; i++) {
        botones[i].addEventListener('click', cambiarCategoria);
    }

    document.getElementById('buscador').addEventListener('input', buscarFotos);

    // Permite llegar desde el inicio con ?categoria=comida, por ejemplo
    var parametros = new URLSearchParams(window.location.search);
    var categoriaUrl = parametros.get('categoria');
    if (categoriaUrl) {
        activarBoton(categoriaUrl);
    }

    mostrarFotos();
}

function cambiarCategoria(evento) {
    activarBoton(evento.currentTarget.getAttribute('data-categoria'));
    mostrarFotos();
}

function buscarFotos(evento) {
    textoBusqueda = evento.target.value;
    mostrarFotos();
}

// Marca el botón activo y guarda la categoría elegida
function activarBoton(categoria) {
    var botones = document.querySelectorAll('.filtro');

    for (var i = 0; i < botones.length; i++) {
        var esElegido = botones[i].getAttribute('data-categoria') === categoria;
        botones[i].classList.toggle('activo', esElegido);
        if (esElegido) {
            categoriaActual = categoria;
        }
    }
}

// Pasa a minúsculas y quita tildes para comparar textos
function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

// Recorre el array con un bucle for y devuelve las fotos que coinciden
function filtrarFotos() {
    var busqueda = normalizar(textoBusqueda);
    var resultado = [];

    for (var i = 0; i < FOTOS.length; i++) {
        var foto = FOTOS[i];
        var coincideCategoria = categoriaActual === 'todos' || foto.categoria === categoriaActual;
        var contenido = normalizar(foto.nombre + ' ' + foto.categoria + ' ' + foto.etiquetas);
        var coincideTexto = contenido.indexOf(busqueda) !== -1;

        if (coincideCategoria && coincideTexto) {
            resultado.push(foto);
        }
    }

    return resultado;
}

// Renderiza en el DOM las fotos filtradas
function mostrarFotos() {
    var contenedor = document.getElementById('galeria');
    var contador = document.getElementById('contador');
    var sinResultados = document.getElementById('sin-resultados');
    var fotos = filtrarFotos();

    contenedor.textContent = '';

    for (var i = 0; i < fotos.length; i++) {
        var articulo = document.createElement('article');
        articulo.className = 'foto';
        articulo.setAttribute('data-categoria', fotos[i].categoria);

        var imagen = document.createElement('img');
        imagen.src = fotos[i].archivo;
        imagen.alt = fotos[i].alt;
        imagen.loading = 'lazy';

        articulo.appendChild(imagen);
        contenedor.appendChild(articulo);
    }

    contador.textContent = fotos.length === 1 ? '1 fotografía' : fotos.length + ' fotografías';
    sinResultados.hidden = fotos.length > 0;
}

/* ==========================================================
   4. TRANSICIONES Y DESPLAZAMIENTO ENTRE PÁGINAS
========================================================== */

function iniciarTransiciones() {
    var enlaces = document.querySelectorAll('a[href]');
    for (var i = 0; i < enlaces.length; i++) {
        enlaces[i].addEventListener('click', manejarEnlace);
    }

    // Si llegás con #sobre-mi desde otra página: arranca arriba y baja suave
    if (window.location.hash) {
        var destino = document.getElementById(window.location.hash.slice(1));
        if (destino) {
            window.scrollTo({ top: 0, behavior: 'instant' });
            setTimeout(function () {
                destino.scrollIntoView({ behavior: 'smooth' });
            }, 400);
        }
    }

    // Al volver con el botón "atrás" la página no debe quedar en blanco
    window.addEventListener('pageshow', function (evento) {
        if (evento.persisted) {
            document.body.classList.remove('saliendo');
        }
    });
}

function manejarEnlace(evento) {
    var enlace = evento.currentTarget;
    var url = new URL(enlace.href, window.location.href);

    // No tocar enlaces externos, mailto, tel, nueva pestaña ni ctrl/cmd + click
    if (url.protocol !== window.location.protocol ||
        url.host !== window.location.host ||
        enlace.target === '_blank' ||
        evento.ctrlKey || evento.metaKey || evento.shiftKey) {
        return;
    }

    evento.preventDefault();

    // Mismo documento: desplazamiento suave, sin recargar
    if (url.pathname === window.location.pathname) {
        var destino = url.hash ? document.getElementById(url.hash.slice(1)) : null;
        if (destino) {
            destino.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
    }

    // Otra página: fundido de salida y recién después navega
    document.body.classList.add('saliendo');
    setTimeout(function () {
        window.location.href = url.href;
    }, 350);
}