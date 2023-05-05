# MoviesApp

Este proyecto se creó con el objetivo de solidificar conocimientos en React Native. Se trata de una aplicación de películas que utiliza la API de http://img.omdbapi.com para renderizar las películas encontradas según lo que se busque. También se puede filtrar por películas/series/juegos y año de lanzamiento. Además, es posible agregar o quitar películas a la sección de favoritos, las cuales quedan guardadas en el almacenamiento local.

## Instrucciones para comenzar

Antes de comenzar a utilizar la aplicación, se necesita conseguir una clave API en la página de la API y crear un archivo `.env` con la variable `APIKEY=tuapikey`.

### Pre-requisitos

Antes de ejecutar la aplicación, asegúrate de tener instalado Android Studio y haber iniciado un simulador móvil.

### Instalación

Para instalar las dependencias del proyecto, debes situarte en la carpeta raíz y ejecutar el siguiente comando en la consola:

```bash
npm install
```

### Ejecución

Para iniciar la aplicación, ejecuta el siguiente comando en la consola:

```bash
npm run android
```

## Características

La aplicación cuenta con las siguientes características:

- Búsqueda de películas por título, con la posibilidad de filtrar por tipo (películas, series, juegos) y año de lanzamiento.
- Paginado que realiza una peticion a cada pagina que devuelve la consulta a la api.
- Posibilidad de agregar o quitar películas a la sección de favoritos, las cuales quedan guardadas en el almacenamiento local.
