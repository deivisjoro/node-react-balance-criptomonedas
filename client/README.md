# Frontend del cotizador

Para instalar el frontend debe realizar los siguientes pasos:

## Instalacion

- Entrar a la seccion del backend
```
cd client
```

- Instalar las dependencias con npm
```
npm i 
```

- Iniciar el proyecto y levantar el servidor

```
npm run dev
```

El proyecto esta configurado para levantarse en el puerto 5173, este puerto lo configura el propio vite, si requiere un puerto diferente debe modificar el archivo de configuracion de vite, agregando lo siguiente, ejemplo modificando el puerto a 4000:
```
server: {
    port: 4000
}
```

El aspecto del archivo deberia ser similar a:
```
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    reporters: 'verbose',
    globals: true
  },
  server: {
    port: 4000
  }
})
```

- Abrir la aplicacion en el navegador de su preferencia

[http://localhost:5173](http://localhost:5173)

Recuerde que el puerto es el configurado en vite, por defecto es el 5173

La app cargara la UI y se conectara de inmediato con el backend quien le enviara via socket de forma inmediata los valores actuales de las 3 monedas
Cada x cantidad de segundos el backend enviara la actualizacion de los datos de las monedas para que el fronted actualice los respectivos cambios

## Funcionamiento de la aplicacion

### Calculadora

Ingrese un valor positivo, puede agregar el punto para incluir valores decimales.

Automaticamente la app reaccione y le da un informa de:
- La cantidad de bitcoins que puede adquirir con el monto ingresado
- La cantidad de Ethereums
- La cantidad de Cardano

En la seccion derecha mostrara por cada moneda
- Ganancia de invertir el capital en cada moneda, cada moneda tiene un porcentaje de retorno fijo mensual
- Retorno: cantidad invertida + ganancia
- Un tercer valor que representa la cantidad de monedas que puede adquirir con la nueva cifra (inversion + ganancia)

En la parte superior se muestra la cantidad de meses a la que se invierten las monedas, se presentan dos botones con los cuales puede aumentar o disminuir la cantidad

### DataTable

Muestra diferentes datos de las 3 monedas seleccionadas, cada cierto tiempo la tabla se actualiza

Tiene opciones para

- Exportar a un archivo json
- Exportar a un archivo csv

## Pruebas

Para ejecutar las pruebas, estando ubicado dentro del directorio client, escriba en una terminal el comando:
```
npm run test
```

### Entendiendo la estructura de carpetas

#### Estructura de carpetas

- **Directorio __test__**

Aqui se encuentran las pruebas unitarias o pruebas por componentes

- **Directorio public**

Archivos estaticos que la app requiere, tales como: imagenes

- **Directorio src**

Contiene los fuentes de la app, la app react y los respectivos componentes


