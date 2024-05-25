# Agilesoft test backend

Este documento README proporciona instrucciones detalladas para clonar, configurar, lanzar y probar el proyecto Agilesoft, que se ha desarrollado utilizando las siguientes tecnologías:

- **NestJS:** Framework de JavaScript diseñado para la creación de aplicaciones de servidor escalables.
- **TypeORM:** ORM que facilita la interacción con bases de datos SQL mediante TypeScript.
- **PostgreSQL:** Sistema de gestión de bases de datos relacional.
- **Docker:** Solución para la virtualización de aplicaciones a nivel de sistema operativo.
- **Docker Compose:** Herramienta para definir y gestionar aplicaciones compuestas por múltiples contenedores.
- **Clean Architecture:** Método de diseño que organiza el código en capas claras y definidas, mejorando la modularidad, flexibilidad y capacidad de prueba.

## Configuración y ejecución

### Requisitos previos

Antes de iniciar, asegúrate de tener los siguientes componentes instalados en tu estación de trabajo:

- [NodeJS](https://nodejs.org/) v16.x
- PostgreSQL
- Docker
- Docker Compose (Para utilizar el archivo `docker-compose.yml` proporcionado.)

### Inicialización

#### Clonación del repositorio

Comienza clonando el repositorio en tu estación de trabajo:

```sh
git clone 


#### Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto.

```env
API_PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=test_user
DB_PASSWORD=test_psw
DB_DATABASE=postgres
```

#### Ejecución

Ejecución del proyecto
Una vez configurado el archivo .env, puedes lanzar el servicio usando Docker Compose con el siguiente comando:



```sh
docker-compose up
```

Este comando tiene varias acciones integradas, incluyendo:

- **Creación de Contenedores**

- **Ejecución de Migraciones** 

- **Carga de Datos Iniciales**

> El servicio estará disponible en <http://localhost:3000/api/>

### Autenticación
Solo debe crear un usuario (ver swagger) y luego iniciar sesión para obtener el token de autenticación. Con este token, puede acceder a los otros endpoints protegidos.


### Documentación

Para una integración y uso efectivos del API, se proporciona documentación completa en Swagger dentro del proyecto. Esta documentación está disponible en:
```url
http://localhost:3000/docs
```

### Pruebas

Para ejecutar las pruebas, utilice el siguiente comando:

```sh
npm run test
```
