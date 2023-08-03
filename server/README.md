# Backend del cotizador

Para instalar el backend debe realizar los siguientes pasos:

## Instalacion

- Entrar a la seccion del backend
```
cd server
```

- Instalar las dependencias con npm
```
npm i 
```

- Iniciar el proyecto y levantar el servidor

```
npm start
```

El proyecto esta configurado para levantarse en el puerto 8081, este puerto es necesario porque en el frontend esta configurado igualmente para realizar peticiones via socket a este puerto, en caso de cambiarlo, tambien deberia realizarlo en el frontend o en su defecto utilizar una variable de entorno para ambos proyectos

## Entendiendo la estructura de carpetas

### Estructura de carpetas

- **Archivo index.js**

Ahi se encuentra el archivo que inicia el servidor, al no contener codigo extenso, ni necesario fragmentar, toda la logica del servicio se implementa en este unico archivo

