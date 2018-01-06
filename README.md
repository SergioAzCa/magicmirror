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

**seguir este tutorial : https://www.1and1.es/digitalguide/servidores/configuracion/como-asignar-una-ip-fija-a-raspberry-pi/**

#Instalamos los siguientes paquetes para instalar NODE:

sudo apt-get install nodejs npm O sudo apt-get install nodejs sudo

actualizacmos minimatch con : npm install minimatch@3.0.2 --save-dev  

actualizamo graceful npm install -g graceful-fs graceful-fs@latest

sudo npm install -g nodewebkit

npm install -g generator-node-webkit
 
npm install -g yo

//Si tenemos problemas al instalar el npm o al realizar cualquier tipo de instalacin posterior deberemos eliminarlo y hacer :

sudo apt-get install npm

----------------------------------------------------------------------------------------

## CREACIÓN DE APP CON NODE WEBKIT

0º Accedemos como root

```
sudo su
```

1º Creamos nuestra carpeta y generamos X carpetas correspondientes a los distintos espacios de trabajos que queramos js/css/python/php etc...

![image](/imagenes/1.png)

2º Generamos un archivo package.json que contendra :

```
{
  "name": "NOMBREDELPROYECTO",
  "version": "0.0.1",
  "main": "./html/index.html", // directorio donde este nuestro html
  "window": {
    "toolbar": false,
    "width": 800,
    "height": 500
  }
}
```


3º Creamos dentro de esta primera carpeta una nueva que se llamara  PROYECTO_build, que contendra 

![image](/imagenes/3.png)

4º Dentro de la carpeta src copiaremos todo el contenido de nuestro primera carpeta

![image](/imagenes/4.png)

5º Generamos en la carteta PROYECTO_build el archivo package.json nuevo :

```
{
"name": "testproject-build",
"version": "0.0.1",
"description": "Building testproject",
"author": "Alguien <alguien@algunsitio.com>",
"private": true,
"dependencies": {
"grunt": "~0.4.2",
"grunt-node-webkit-builder": "~0.1.14"
}
}
```


6º Generamos también el contenido de Grunt.js 

```
module.exports = function(grunt) {
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
});

grunt.loadNpmTasks(‘grunt-node-webkit-builder’);

grunt.registerTask(‘default’, [‘nodewebkit’]);
};
```

7º Entramos dentro de la carpeta PROYECTO_build y instalamos npm

```
npm install
```

8º Lanzamos GRUNT

```
grunt --force
```


# CAMERA BUILDING (OPENCV)

hacer fotografias portables a bbdd https://www.youtube.com/watch?v=r5pXWky_3T0

Para una simple fotografía  - raspistilll -o test.jpg



### Compilación de  OPENCV
```
1) Descargamos OPENCV de la web : https://opencv.org/releases.html
   También nos descargamos opencv-contrib : https://github.com/opencv/opencv_contrib/releases // Módulos extra

2) Pasamos con FILEZILLA a la raspberry PI ZERO W  y creamos una carpeta en /home/pi llamada opencv
```

### Desde consola empezamos a instalar librerias, recordar actualizar todo a la última version 

```

1) sudo apt-get -y install libopencv-dev build-essential cmake git libgtk2.0-dev pkg-config

2) sudo apt-get -y install python-dev python-numpy python2.7-dev unzip python3-dev libqt5-dev

3) sudo apt-get -y install libjpeg-dev libpng12-dev libjasper-dev libtiff5-dev  libopenexr-dev

4) sudo apt-get -y install libavcodec-dev libswscale-dev libavformat-dev libv4l-dev libxvidcore-dev libx264-dev libdc1394-22 

5) sudo apt-get -y install libatlas-base-dev gfortran 

6) sudo apt-get -y install  libgstreamer0.10-dev libgstreamer-plugins-base0.10-dev  libmp3lame-dev libopencore-amrnb-dev  libtheora-dev libvorbis-dev v4l-utils 

```

### Una vez instalados todas las librerias procedemos a la compilación de OPENCV


1) Pondremos las siguientes líneas en el archivo opencv-3.3.1/modules/videoio/src/cap_ffmpeg_impl.hpp

```
#define AV_CODEC_FLAG_GLOBAL_HEADER (1 << 22)
#define CODEC_FLAG_GLOBAL_HEADER AV_CODEC_FLAG_GLOBAL_HEADER
#define AVFMT_RAWPICTURE 0x0020

```

2) Crearemos una carpeta dentro del directorio /home/pi/opencv/opencv-3.3.1 que llamaremos build

```
sudo mkdir build

```
3) Accedemos a ella y dentro ejecutamos : 

```
sudo cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local -D OPENCV_EXTRA_MODULES_PATH=~/opencv/opencv_contrib/modules -D WITH_TBB=ON -D WITH_OPENGL=OFF -D WITH_V4L=ON -D WITH_QT=ON -D INSTALL_C_EXAMPLES=OFF -D INSTALL_PYTHON_EXAMPLES=OFF -D BUILD_EXAMPLES=OFF  ..
```

4) Una vez finalice ejecutaremos :
```
sudo make  // Este proceso de compilación puede durar unas 10 horas
```

5) Instalamos la aplicación y configuramos

```
sudo make install
 
sudo ldconfig
```

# Comunicación externa con RAS PI

```
sudo iwlist wlan0 scan
ESSID:"testing"' 
Para entrar a definir la red :
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf

network={
    ssid="testing"
    psk="testingPassword"
    key_mgmt=WPA-PSK
}
```
