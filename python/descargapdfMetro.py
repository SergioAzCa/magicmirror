# -*- coding: utf-8 -*-
import requests
import sys
import time
from datetime import date
import numpy as np


#Buscamos el día para la descarga de los horarios
dia_array = []
dia = date.today()
dia = str(dia)
dia_list = dia.split("-")
dia_array =np.asarray(dia_list)

anyo = dia_array[0]
mes =  dia_array[1]
dia =  dia_array[2]

#podemos obtener el origen y destino desde la base de datos
origen = 3
destino = 11


#realizamos la desgarga del pdf

url = 'http://www.metrovalencia.es/horarios_pdf.php?origen='+str(origen)+'&destino='+str(destino)+'&fecha='+str(dia)+'/'+str(mes)+'/'+str(anyo)+'&hini=00:00&hfin=23:59&callback=?'
response = requests.get(url)
with open('../PDF/metrohorario.pdf', 'wb') as f:
    f.write(response.content)

