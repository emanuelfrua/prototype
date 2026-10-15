# Plan a Dos

Una app web para encontrar una idea de cita según ánimo, presupuesto y tiempo. La versión inicial funciona completamente en el navegador: no necesita cuenta ni servidor y conserva los favoritos en `localStorage`.

## Desarrollo

```sh
npm install
npm run dev
```

Para validar el proyecto:

```sh
npm run lint
npm run test
npm run build
```

## Publicar gratis en GitHub Pages

1. Crea un repositorio de GitHub y sube este proyecto a la rama `main`.
2. En **Settings > Pages**, selecciona **GitHub Actions** como fuente.
3. Haz push a `main`. El workflow `.github/workflows/deploy.yml` construye y publica el contenido de `dist`.

El `base` de Vite se calcula automáticamente en GitHub Actions a partir del nombre del repositorio, para que los recursos funcionen también si el sitio se publica en `https://usuario.github.io/nombre-del-repositorio/`.

## Backend Go futuro

La interfaz usa un repositorio de planes intercambiable: por defecto consume el catálogo local de `src/data/plans.ts`. Para conectarla a una API, compila con `VITE_API_BASE_URL` apuntando al origen del servicio. El esqueleto y el contrato previsto están en [`api/`](api/README.md).

GitHub Pages no ejecuta Go ni almacena datos. Cuando se active el backend, habrá que desplegar `api/` en un proveedor que admita servicios web y configurar CORS para el origen de GitHub Pages.

## Lugares y mapas

La sección de lugares recomienda sitios de Buenos Aires, Puerto Iguazú, Wanda, Foz do Iguaçu y Ciudad del Este con coste orientativo. Los importes, horarios y condiciones pueden variar, por lo que la app enlaza a la información oficial cuando está disponible. El mapa embebido usa OpenStreetMap sin clave de API y el botón de direcciones abre Google Maps con el destino seleccionado.

Las opciones en Brasil y Paraguay requieren confirmar documentación, requisitos fronterizos, reservas y condiciones de ingreso con las autoridades y los prestadores oficiales antes de viajar.

Además, cada pareja puede guardar lugares y agendar una cita con fecha, presupuesto y nota. Esos datos se conservan solo en el `localStorage` del navegador usado, sin enviarse a ningún servidor.
