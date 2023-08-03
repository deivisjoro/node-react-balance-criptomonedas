# Cotizador de Cryptomonedas

Se utilizo la api de [coingecko](https://www.coingecko.com), ya que este sitio ofrece su api de forma gratuita para pruebas, la unica limitacion es que solo permite entre 10 y 20 solicitudes por minuto. Tambien presenta algunos endpoints que no cumplen con lo anterior y limitan aun mas las solicitudes.
El endpoint que me ofrecia la informacion de las 3 monedas se "bloqueaba" muy a menudo, entonces me vi en la necesidad de realizar a otro endpoint las 3 solicitudes de forma independiente.
Dado que el backend mediante socket debe estar notificando a sus clientes las actualizaciones de los datos de las monedas, el backend debe conectarse al api cada ciertos segundos a realizar 3 peticiones, teniendo en cuenta la restriccion de 10 solicitudes por minuto, se calculo que el backend debe realizar aprox peticiones cada 20 segundos, para que en 1 minuto
60 / 20 = 3 intentos
cada intento tiene 3 solicitudes: 3x3 = 9, en total 9 peticiones al api por minuto

En el proyecto encontrara dos secciones: 
- client: es la aplicacion front, realizada con react
- server: es la aplicacion back, realizada con node y express

Para utilizar el proyecto realice los siguientes pasos:

- Descargar o clonar el repositorio

```
git clone https://github.com/deivisjoro/node-react-balance-criptomonedas.git
```

- Copiar  el proyecto en el directorio deseado 

- Entrar a la carpeta del proyecto: cd nombre-del-proyecto

```
cd node-react-balance-criptomonedas
```

El servidor y el cliente se diseñaron para correr en servidores independientes

Dentro de este mismo proyecto,tanto en el server como en el cliente encontrara los respectivos archivos README.md con la informacion para la instalacion de cada servicio
