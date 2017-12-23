import cv2,os
import numpy as np
from PIL import Image 
import pickle
import io
import picamera
import picamera.array

size = 4

recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read('/home/pi/Reconocimiento_Facial/reconocimiento/reconocimiento.yml')
cascadePath = "caras_general/caras.xml"
faceCascade = cv2.CascadeClassifier(cascadePath);
path = 'libreria_de_caras'

font = cv2.FONT_HERSHEY_SIMPLEX #Creates a font
print "ENTRANDO"
while True:
    with picamera.PiCamera() as camera:
        cap=picamera.array.PiRGBArray(camera)
        camera.resolution = ( 640,480)
        camera.start_preview()
        camera.capture(cap,format="bgr")
        im=cap.array
    gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    #mini = cv2.resize(gray,(gray.shape[1]/size, gray.shape[0]/ size))
    faces = faceCascade.detectMultiScale(gray,scaleFactor=1.2,minNeighbors=5,minSize=(100,100),flags=cv2.CASCADE_SCALE_IMAGE)
    for (x,y,w,h) in faces:
		nbr_predicted, conf = recognizer.predict(gray[y:y+h,x:x+w])
		cv2.rectangle(im,(x-50,y-50),(x+w+50,y+h+50),(225,255,255),2)
		if(nbr_predicted==1):
			nbr_predicted='Sergio'
		elif(nbr_predicted==2):
			nbr_predicted='Carlos'
		cv2.putText(im,str(nbr_predicted)+"--"+str(conf),(x-10,y-10),cv2.FONT_HERSHEY_PLAIN,1,(62,61,205))
		cv2.imshow('Reconocimiento',im)
		cv2.waitKey(10)









