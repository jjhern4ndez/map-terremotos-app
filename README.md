# Mapa de Terremotos

**Single Page Aplication (SPA)** en **Angular v20** para la visualización de **terremotos** registrados durante los últimos 30 días sobre un mapa interactivo. Consume el *feed* público de la **USGS (United States Geological Survey)** y permite explorar, ubicar y consultar el detalle de cada sismo de forma rápida y visual.

## Características

- Mapa interactivo con **MapLibre GL**, con puntos geográficos que representan cada sismo.
- Lista de terremotos con **virtual scrolling** (CDK) para manejar cientos de registros sin perder rendimiento.
- En la lista se puede hacer click en un registro para centrar el mapa con `flyTo` y abre una **tarjeta de detalle** con animaciones de entrada/salida.
- **Hover inteligente** para que al mantener el cursor (mínimo 1s) sobre un registro en la lista, el mapa se centra en ese punto y lo resalta en azul.
- Se puede realizar clic sobre un punto en el mapa para abrir una tarjeta de detalle que muestra más información de cada registro.
- **Card de detalle** con colores dinámicos según la magnitud del evento y con la opción de ver un detalle completo del terremoto reportado que redirije al sitio web público de donde se obtuvo la información.
- **Estado de carga** con spinner y manejo de errores de red.
- **Lista colapsable** con animación suave.
- **Puntos del mapa** diferenciados por estado: gris (normal), azul (hover) y rojo (seleccionado).

## Tecnologías y versiones relevantes

| Tecnología          | Versión     | Uso                                        |
| ------------------- | ----------- | ------------------------------------------ |
| Angular             | ~20.3       | Framework (componentes standalone + signals) |
| Angular Material    | ~20.2       | Iconos (`MatIcon`)                          |
| Angular CDK         | ~20.2       | Virtual scrolling (`ScrollingModule`)       |
| MapLibre GL         | 5.24.0      | Mapa interactivo                            |
| Tailwind CSS        | ^4.3        | Estilos (utility-first)                     |
| RxJS                | ~7.8        | Programación reactiva / HTTP                |
| TypeScript          | ~5.8        | Lenguaje                                   |
| Node.js             | 22.x        | Entorno de ejecución (recomendado)          |


### Convenciones de la arquitectura

- **Componentes standalone** con `ChangeDetectionStrategy.OnPush`.
- **Estado centralizado** en `EarthquakeMapStore` (basado en `signal`/`computed`), proveído a nivel de ruta.
- Separación por capas: `core` (modelos y servicios) y `features` (funcionalidades por dominio).
- **Alias de rutas** definidos en `tsconfig.app.json`:
  - `@app/*` → `src/app/*`
  - `@services/*` → `src/app/core/services/*`
  - `@models/*` → `src/app/core/models/*`
  - `@shared/*` → `src/app/shared/*`

## Requisitos previos

- **Node.js 20 o superior** (desarrollado con Node 22).
- **npm** (viene con Node).
- Conexión a internet: la app consume datos de la USGS y el estilo de mapas de demostración de MapLibre.

## Instalación y ejecución

1. **Instalar dependencias**

   ```bash
   npm install
   ```

2. **Ejecutar aplicación**

   ```bash
   npm start
   ```
   
   ó

   ```bash
   ng serve
   ```

   Abre `http://localhost:4200/`. El servidor recarga automáticamente ante cambios.


### Scripts disponibles

| Comando          | Descripción                                   |
| ---------------- | --------------------------------------------- |
| `npm start`      | Servidor de desarrollo (`ng serve`)           |
| `npm run build`  | Build de producción (`ng build`)              |
| `npm run watch`  | Build de desarrollo en modo *watch*           |
| `npm test`       | Ejecuta las pruebas unitarias (`ng test`)     |

## Fuente de datos y configuración

- **Datos**: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson` (últimos 30 días). Configurable en `src/app/core/services/earthquake.service.ts`.
- **Estilo del mapa**: se usa el estilo de demostración de MapLibre (`https://demotiles.maplibre.org/style.json`) en `map.component.ts`.

## Recomendaciones

- Mantener la lógica de datos en el **store** y la presentación en los **componentes** (la lista y la card solo leen del store).
- El *virtual scroll* requiere una altura fija del viewport; si se modifican los tamaños de las filas, actualizar también `itemSize` y la altura de fila en `earthquake-list.component.html`.

