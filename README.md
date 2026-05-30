# 🌍 WeatherNow: Panel de Ciudades — Home Challenge
### Módulo 5 · Lección 3 · Comunicación con Servidores

---

## 📌 Contexto

El buscador que construiste en clase funciona perfecto.
Pero el cliente de **StormLab** quiere más: un panel que muestre el clima de sus ciudades favoritas **automáticamente al cargar la página**, sin que el usuario tenga que buscar nada.

El Tech Lead te envió `ciudades.js` — el archivo que faltaba.
Agrégalo al proyecto que ya tienes de clase y trabaja desde ahí.

---

## 📁 Cómo agregar el archivo al proyecto

1. Descarga `ciudades.js` y colócalo en la misma carpeta que los demás archivos
2. Abre `index.html` y agrega esta línea **después** de `app.js`:

```html
<script src="ciudades.js"></script>
```

3. Verifica que el orden final en el HTML quede así:
```html
<script src="config.js"></script>
<script src="ui.js"></script>
<script src="app.js"></script>
<script src="ciudades.js"></script>
```

El buscador de clase no se toca — sigue funcionando igual.

---

## 📁 Archivos del proyecto

| Archivo | Estado | Tu rol |
|---|---|---|
| `index.html` | ✅ De clase | No tocar |
| `config.js` | ✅ De clase | No tocar |
| `ui.js` | ✅ De clase | No tocar |
| `app.js` | ✅ Completado en clase | No tocar |
| `ciudades.js` | ⚙️ Incompleto | **Aquí trabajas** |

---

## 🎫 TICKET 1 — Completa `fetchCiudadFavorita(ciudad, contenedor)`
**Tiempo estimado: 20 min**

Esta función es casi idéntica a `fetchClima()` que ya hiciste en clase.
La diferencia clave: en lugar de renderizar en `#resultado`, renderiza dentro del `contenedor` que recibe como parámetro.

La función ya tiene esto listo:
- La URL armada igual que en clase
- Un estado de carga que se muestra en el contenedor específico

Lo que falta es encadenar las respuestas. El patrón es exactamente el mismo de clase:

**Paso 1 — Primer `.then()`**
Verifica `response.ok`. Si falla, lanza `new Error("No disponible")`.
Si está bien, retorna `response.json()`.

**Paso 2 — Segundo `.then()`**
Recibe `data` y llama a `renderizarTarjeta(data, contenedor)`.
Esa función ya está lista más arriba en el mismo archivo.

**Paso 3 — `.catch()`**
Muestra un mensaje de error **dentro del contenedor** (no en `#resultado`).
El HTML del error ya está escrito como comentario en el archivo — solo descoméntalo y úsalo.

```javascript
function fetchCiudadFavorita(ciudad, contenedor) {
    let url = BASE_URL + "?q=" + encodeURIComponent(ciudad) + "&appid=" + API_KEY + "&units=metric&lang=es";
    contenedor.innerHTML = '<div class="cargando-mini"><div class="spinner-mini"></div></div>';
    fetch(url)
        .then(function(response) {
            // TODO — igual que en clase: verifica ok, retorna json
        })
        .then(function(data) {
            // TODO — llama a renderizarTarjeta con data y contenedor
        })
        .catch(function(error) {
            // TODO — muestra el error dentro del contenedor
        });
}
```

---

## 🎫 TICKET 2 — Completa `cargarFavoritas()`
**Tiempo estimado: 15 min**

Esta función debe recorrer el array `CIUDADES_FAVORITAS` y mostrar una tarjeta por cada ciudad en el panel `#panel-ciudades`.

El array ya está declarado arriba con 5 ciudades. Lo que tienes que hacer:

1. Obtener el elemento `#panel-ciudades` y vaciarlo (`innerHTML = ""`)
2. Iterar `CIUDADES_FAVORITAS` con `forEach`
3. Por cada ciudad: crear un `div` con `document.createElement("div")`, asignarle la clase `"contenedor-tarjeta-favorita"`, agregarlo al panel con `appendChild`, y llamar a `fetchCiudadFavorita(ciudad, divCiudad)`

```javascript
function cargarFavoritas() {
    let panel = document.getElementById("panel-ciudades");
    // TODO — vaciar el panel
    CIUDADES_FAVORITAS.forEach(function(ciudad) {
        // TODO — crear div, asignar clase, agregar al panel, llamar fetchCiudadFavorita
    });
}
```

> 💡 **Pista:** Fíjate que cada ciudad recibe su propio `div` como contenedor. Por eso `fetchCiudadFavorita` necesita recibir el contenedor — cada tarjeta sabe exactamente dónde tiene que aparecer.

---

## 🎫 TICKET 3 — Conecta el botón "Refrescar todo"
**Tiempo estimado: 10 min**

El botón `#btn-refrescar` ya existe en el HTML.
Agrégale un event listener que, al hacer click, llame a `cargarFavoritas()`.

También asegúrate de que `cargarFavoritas()` se llame una vez al cargar la página — sin que el usuario tenga que hacer nada.

```javascript
// TODO — event listener del botón

// TODO — llamada inicial para que el panel cargue solo al abrir la app
```

---

## 🔥 BONUS — Agregar una ciudad al panel
**Tiempo estimado: 15 min**

El cliente quiere poder agregar ciudades nuevas al panel sin recargar todo.
Hay un input `#input-nueva-ciudad` y un botón `#btn-agregar-ciudad` en el HTML esperando que los conectes.

Al hacer click en el botón:
1. Lee el valor del input
2. Si no está vacío, haz `.push()` del valor al array `CIUDADES_FAVORITAS`
3. Crea un `div` nuevo, agrégalo al panel y llama `fetchCiudadFavorita` **solo para esa ciudad nueva** — sin recargar las demás
4. Limpia el input

> 💡 **Pista:** El paso 3 es exactamente lo que hace el `forEach` del Ticket 2 — pero para un solo elemento en lugar de todo el array. Ya sabes cómo hacerlo.

---

## ✅ Estado esperado al terminar

- Al abrir la app, el panel muestra automáticamente el clima de las 5 ciudades favoritas.
- El botón "Refrescar todo" vuelve a cargar todas las tarjetas.
- El buscador de clase sigue funcionando exactamente igual, sin ningún cambio.
- El bonus: puedes agregar una ciudad nueva y su tarjeta aparece al final del panel sin que las demás se recarguen.
