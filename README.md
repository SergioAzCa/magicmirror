## FOX MAGIC MIRROR

# Creación de un Magic Mirror completo

En primer lugar tenemos que plantear que bases vamos a utilizar en nuestro Magic Mirror.

- Uso de análisis meteorológico con <https://darksky.net/dev>

- Lectura de datos internos de la casa con conexión a la Raspberry original.

- Función de reconocimiento facial.

- Conectividad con el resto de sensores de la casa para su unificación.

- Detección de una persona para salir de la hibernación



Usamos PDF.js para la lectura de la web de METRO

Para los módulos de Python necesitaremos instalar pip y los diversos módulos que aparezcan en el archivo python.


// IP FIJA EN RASPBYAN

sudo nano /etc/dhcpcd.conf  // static ip_address=192.168.1.XX cambiamos a la ip que queramos
sudo nano /etc/network/interfaces // Nos aseguramos que la ip sea fija o manual

#Instalamos los siguientes paquetes para instalar NODE:

sudo apt-get install nodejs npm O sudo apt-get install nodejs sudo

sudo npm install -g nodewebkit

npm install -g generator-node-webkit
 
npm install -g yo

//Si tenemos problemas al instalar el npm o al realizar cualquier tipo de instalacin posterior deberemos eliminarlo y hacer :

sudo apt-get install npm


Como crear una aplicacion en NODEWEBKIT
0º Accedemos como root

sudo su

1º Creamos nuestra carpeta y generamos X carpetas correspondientes a los distintos espacios de trabajos que queramos js/css/python/php etc...

![image](/imagenes/1.png)

2º Generamos un archivo package.json que contendra :

'''{
  "name": "NOMBREDELPROYECTO",
  "version": "0.0.1",
  "main": "./html/index.html", // directorio donde este nuestro html
  "window": {
    "toolbar": false,
    "width": 800,
    "height": 500
  }
}'''


3º Creamos dentro de esta primera carpeta una nueva que se llamara  PROYECTO_build, que contendra 

![image](/imagenes/3.png)

4º Dentro de la carpeta src copiaremos todo el contenido de nuestro primera carpeta

![image](/imagenes/4.png)

5º Generamos en la carteta PROYECTO_build el archivo package.json nuevo :

'''{
"name": "testproject-build",
"version": "0.0.1",
"description": "Building testproject",
"author": "Alguien <alguien@algunsitio.com>",
"private": true,
"dependencies": {
"grunt": "~0.4.2",
"grunt-node-webkit-builder": "~0.1.14"
}
}'''


6º Generamos también el contenido de Grunt.js 

'''module.exports = function(grunt) {
grunt.initConfig({
pkg: grunt.file.readJSON('src/package.json'),
nodewebkit: {
options: {
build_dir: './dist',
// specifiy what to build
mac: false,
win: true,
linux32: true,
linux64: true
},
src: './src/**/*'
},
});'''

grunt.loadNpmTasks(‘grunt-node-webkit-builder’);

grunt.registerTask(‘default’, [‘nodewebkit’]);
};

7º Entramos dentro de la carpeta PROYECTO_build y instalamos npm

npm install

8º Lanzamos GRUNT

grunt --force
