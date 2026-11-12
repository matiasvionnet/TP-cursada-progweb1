# TP-cursada-progweb1 — OBSERVAR — Desde otro punto de vista

Sitio web de portfolio fotográfico desarrollado como **Proyecto Integrador de Cursada** para la materia **Programación Web I** (Tecnicatura Universitaria en Programación de Sistemas - **UCES**).

🌐 **Demo en vivo:** [https://matiasvionnet.github.io/TP-cursada-progweb1/](https://matiasvionnet.github.io/TP-cursada-progweb1/)

---

## 📋 Descripción del Proyecto

**Observar** es una plataforma minimalista diseñada para exhibir trabajos de fotografía profesional divididos en distintas categorías (*Automóviles, Comida, Moda y Autor*). El proyecto abarca desde la maquetación semántica y el diseño responsivo hasta la implementación de lógica dinámica e interactividad del lado del cliente con **JavaScript puro (Vanilla JS)**.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica, formularios con atributos de validación nativa y accesibilidad (`aria-label`, `aria-expanded`, `aria-live`, `role`).
* **CSS3:** Diseño responsivo (*Mobile-First* / *Desktop-First* con *Media Queries* a `720px` y `480px`), layouts flexibles mediante **Flexbox**, animaciones suaves (`@keyframes`) y tipografías de Google Fonts (*Shippori Mincho* y *Zen Kaku Gothic New*).
* **JavaScript (ES5/ES6 Vanilla):** Manipulación del DOM, manejo de eventos desacoplados, filtrado de colecciones en tiempo real y validación dinámica de formularios.

---

## 📁 Estructura del Repositorio

```text
TP-cursada-progweb1/
├── index.html              # Página principal (Hero, Sobre mí y Colecciones destacadas)
├── galeria.html            # Catálogo interactivo de fotografías con filtros y buscador
├── contacto.html           # Información de contacto y formulario con validación en tiempo real
├── README.md               # Documentación del proyecto
├── imagenes/               # Recursos gráficos organizados por categoría
│   ├── autor/
│   ├── automoviles/
│   ├── comida/
│   └── moda/
└── recursos/
    ├── style.css           # Hoja de estilos principal y reglas responsivas
    └── funciones.js        # Lógica de interactividad y manipulación del DOM
```

---

## ⚙️ Funcionalidades Principales (Fase 3 - Interactividad JS)

Siguiendo las buenas prácticas de desarrollo web, toda la lógica está desacoplada del HTML en `recursos/funciones.js` y se inicializa tras el evento `load` del navegador (`window.addEventListener('load', iniciar)`):

1. **Menú Táctil Móvil Activo:**
   * En resoluciones de smartphone (`<= 480px`), la barra de navegación se transforma en un botón hamburguesa (`#btn-menu`).
   * Al hacer clic, alterna la clase `.activo` mediante `classList.toggle()` y actualiza los atributos de accesibilidad (`aria-expanded`).

2. **Catálogo Interactivo en Galería (`galeria.html`):**
   * **Renderizado Dinámico:** Las fotografías se almacenan en un arreglo de objetos (`FOTOS`) y se inyectan en el DOM mediante bucles `for`.
   * **Filtros por Categoría y Parámetros URL:** Permite filtrar por *Todas, Automóviles, Comida, Moda* o *Autor*, e incluso soporta navegación directa desde el inicio mediante *Query Strings* (ej. `galeria.html?categoria=comida`).
   * **Buscador en Tiempo Real:** Intercepta el evento `input`, normaliza el texto (eliminando tildes y mayúsculas) y actualiza el contador de resultados dinámicamente.

3. **Validación Visual del Formulario (`contacto.html`):**
   * Escucha los eventos `input`, `change` y `blur` en cada campo.
   * Aplica retroalimentación visual inmediata (clases `.campo-error` y `.campo-valido`) junto con mensajes descriptivos generados dinámicamente en el DOM, removiendo los errores automáticamente cuando el usuario corrige los datos.

4. **Transiciones Fluidas entre Páginas:**
   * Intercepta los enlaces internos para aplicar un efecto de fundido de salida (`opacity`) antes de redirigir, además de gestionar desplazamientos suaves (`smooth scroll`) hacia anclas internas como `#sobre-mi`.

---

## 🚀 Instalación y Ejecución Local

No requiere dependencias ni servidores externos para funcionar:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/matiasvionnet/TP-cursada-progweb1.git
   ```
2. Abrir la carpeta del proyecto y ejecutar el archivo `index.html` en cualquier navegador web moderno (o utilizar la extensión *Live Server* en Visual Studio Code).

---

## ✒️ Autor

* **Matías Vionnet** — *Fotografía & Desarrollo Web*
  * Instagram: [@matias_vionnet](https://www.instagram.com/matias_vionnet/)
  * Email: matias.vionnet@gmail.com
