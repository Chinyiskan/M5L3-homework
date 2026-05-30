// ============================================================
//  WeatherNow — ciudades.js
//  M5L3 · JavaScript Bootcamp — Home Challenge
// ============================================================
//  INSTRUCCIONES:
//  → Agrega este archivo a tu proyecto de clase.
//  → En index.html cárgalo DESPUÉS de app.js.
//  → config.js y ui.js siguen siendo los mismos de clase.
//  → renderizarTarjeta() ya está lista abajo — no la toques.
// ============================================================


// ─────────────────────────────────────────────────────────────
//  Ciudades favoritas — ya están declaradas ✅
//  Puedes cambiar los nombres si quieres, pero no el formato.
// ─────────────────────────────────────────────────────────────

let CIUDADES_FAVORITAS = ["Madrid", "Paris", "New York", "Tokyo", "Sydney"];


// ─────────────────────────────────────────────────────────────
//  Función de UI — ya está lista ✅ — no la toques
//  Recibe los datos del clima y un contenedor específico,
//  y renderiza la tarjeta dentro de ese contenedor.
// ─────────────────────────────────────────────────────────────

function renderizarTarjeta(data, contenedor) {
    let tempRedondeada = Math.round(data.main.temp);
    let descripcion = data.weather[0].description;
    let descripcionCapitalizada = descripcion.charAt(0).toUpperCase() + descripcion.slice(1);

    let html = '<div class="tarjeta-favorita">';
    html += '<div class="tarjeta-fav-header">';
    html += '<h3>' + data.name + ' <span class="pais-badge-mini">' + data.sys.country + '</span></h3>';
    html += '</div>';
    html += '<div class="tarjeta-fav-main">';
    html += '<img src="https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png" alt="' + descripcion + '" class="clima-icono-mini">';
    html += '<div class="temp-valor-mini">' + tempRedondeada + '°C</div>';
    html += '</div>';
    html += '<p class="clima-desc-mini">' + descripcionCapitalizada + '</p>';
    html += '<div class="tarjeta-fav-detalles">';
    html += '<span class="fav-detalle-item"><span class="material-icons detail-icono-mini">water_drop</span> ' + data.main.humidity + '%</span>';
    html += '<span class="fav-detalle-item"><span class="material-icons detail-icono-mini">air</span> ' + data.wind.speed + ' m/s</span>';
    html += '</div>';
    html += '</div>';

    contenedor.innerHTML = html;
}


// ─────────────────────────────────────────────────────────────
//  🎫 TICKET 1 — Completa fetchCiudadFavorita(ciudad, contenedor)
//
//  Esta función es casi idéntica a fetchClima() que ya hiciste
//  en clase. La diferencia: en lugar de renderizar en #resultado,
//  renderiza dentro del contenedor que recibe como parámetro.
// ─────────────────────────────────────────────────────────────

function fetchCiudadFavorita(ciudad, contenedor) {

    let url = BASE_URL + "?q=" + encodeURIComponent(ciudad) + "&appid=" + API_KEY + "&units=metric&lang=es";

    // Estado de carga dentro de la tarjeta específica — ya está ✅
    contenedor.innerHTML = '<div class="cargando-mini"><div class="spinner-mini"></div></div>';

    fetch(url)

        // Paso 1 — igual que en clase: verifica ok y convierte a JSON
        .then(function(response) {

            // TODO: si response.ok es false, lanza un error: "No disponible"

            // TODO: si llegó bien, retorna response.json()

        })

        // Paso 2 — los datos están listos
        .then(function(data) {

            // TODO: llama a renderizarTarjeta() con data y contenedor.
            // Ojo: esta vez no es mostrarClima() — es renderizarTarjeta(),
            // porque necesita saber en qué contenedor específico pintar.

        })

        // Paso 3 — algo salió mal
        .catch(function(error) {

            // TODO: muestra el error DENTRO del contenedor, no en #resultado.
            // Usa este HTML listo — solo reemplaza los valores:
            // '<div class="tarjeta-error">
            //     <p class="error-ciudad">NOMBRE_CIUDAD</p>
            //     <p class="error-mensaje-mini">MENSAJE_ERROR</p>
            // </div>'
            // Pista: contenedor.innerHTML = ...

        });
}


// ─────────────────────────────────────────────────────────────
//  🎫 TICKET 2 — Completa cargarFavoritas()
//
//  Recorre CIUDADES_FAVORITAS y crea una tarjeta por cada una.
//  Cada ciudad necesita su propio div contenedor — eso es lo
//  que hace que cada tarjeta sepa dónde tiene que aparecer.
// ─────────────────────────────────────────────────────────────

function cargarFavoritas() {

    let panel = document.getElementById("panel-ciudades");

    // TODO: vacía el panel antes de cargar — evita duplicados al refrescar.
    // Pista: panel.innerHTML = ""

    CIUDADES_FAVORITAS.forEach(function(ciudad) {

        // TODO: crea un div con document.createElement("div")

        // TODO: asígnale la clase "contenedor-tarjeta-favorita"
        // Pista: divCiudad.className = "..."

        // TODO: agrega el div al panel
        // Pista: panel.appendChild(divCiudad)

        // TODO: llama a fetchCiudadFavorita pasándole la ciudad y el div
        // Ese div es el contenedor donde aparecerá la tarjeta de esa ciudad

    });
}


// ─────────────────────────────────────────────────────────────
//  🎫 TICKET 3 — Conecta el botón y la carga inicial
// ─────────────────────────────────────────────────────────────

let btnRefrescar = document.getElementById("btn-refrescar");

btnRefrescar.addEventListener("click", function() {

    // TODO: llama a cargarFavoritas()
    // Al hacer click, el panel se limpia y recarga todas las ciudades

});

// TODO: llama a cargarFavoritas() aquí, sin evento, sin botón.
// Esto hace que el panel se llene solo cuando la página abre.


// ════════════════════════════════════════════════════════════
//  🔥 BONUS — Agregar una ciudad nueva al panel
//
//  El HTML ya tiene un input (#input-nueva-ciudad) y un
//  botón (#btn-agregar-ciudad). Conéctalos para que:
//
//  1. Leas el valor del input al hacer click en el botón
//  2. Si no está vacío, hagas push() al array CIUDADES_FAVORITAS
//  3. Crees UN solo div nuevo, lo agregues al panel y llames
//     fetchCiudadFavorita — sin recargar las tarjetas que ya están
//  4. Limpies el input después del push
//
//  Pista para el paso 3: es exactamente lo que hace el forEach
//  del Ticket 2, pero para una sola ciudad en lugar del array completo.
// ════════════════════════════════════════════════════════════
