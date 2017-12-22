import cv2,os
import numpy as np
from PIL import Image 
import pickle
import io
import picamera
import picamera.array



recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read('reconocimiento/reconocimiento.yml')
cascadePath = "caras_general/caras.xml"
faceCascade = cv2.CascadeClassifier(cascadePath);
path = 'libreria_de_caras'

font = cv2.CV_FONT_HERSHEY_SIMPLEX #Creates a font
while True:
	with picamera.PiCamera() as camera:
		cap=picamera.array.PiRGBArray(camera)
        camera.resolution = ( 640,480)
        camera.start_preview()
        camera.capture(cap,format="bgr")
        im=cap.array  
	gray=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
	faces=faceCascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=5, minSize=(100, 100), flags=cv2.CASCADE_SCALE_IMAGE)
	for(x,y,w,h) in faces:
		nbr_predicted, conf = recognizer.predict(gray[y:y+h,x:x+w])
		cv2.rectangle(im,(x-50,y-50),(x+w+50,y+h+50),(225,0,0),2)
		if(nbr_predicted==1):
			 nbr_predicted='Sergio'
		elif(nbr_predicted==2):
			 nbr_predicted='Paula'
		cv2.cv.PutText(cv2.cv.fromarray(im),str(nbr_predicted)+"--"+str(conf), (x,y+h),font, 255) #Draw the text
		cv2.imshow('Imagen',im)
		cv2.waitKey(10)









