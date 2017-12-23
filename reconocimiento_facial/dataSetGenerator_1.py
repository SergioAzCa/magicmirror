import cv2,sys,numpy,os
import picamera
import picamera.array

size = 4
offset=0
fn_haar = 'caras_general/caras.xml'
haar_cascade = cv2.CascadeClassifier(fn_haar)
(im_width,im_height) = (640,480)
count = 0
name=raw_input('Introduce el id :')
while count < 100:
    with picamera.PiCamera() as camera:
        cap=picamera.array.PiRGBArray(camera)
        camera.resolution = ( 640,480)
        camera.start_preview()
        camera.capture(cap,format="bgr")
        im=cap.array  
    gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    mini = cv2.resize(gray,(gray.shape[1]/size, gray.shape[0]/ size))
    faces = haar_cascade.detectMultiScale(mini)
    faces = sorted(faces,key=lambda x: x[3])
    if faces :
        face_i = faces [0]
        (x,y,w,h) = [v* size for v in face_i]
        face = gray[y:y+h,x:x+w]
        face_resize = cv2.resize(face,(im_width,im_height))
        cv2.imwrite("libreria_de_caras/cara-de-"+str(name) +'.'+ str(count) + ".jpg", gray[y-offset:y+h+offset,x-offset:x+w+offset])
        cv2.imshow('im',im[y-offset:y+h+offset,x-offset:x+w+offset])
        cv2.rectangle(im,(x,y),(x+w,y+h),(0,255,0),3)
        cv2.putText(im,name,(x-10,y-10),cv2.FONT_HERSHEY_PLAIN,1,(161,82,68))
        count += 1
    cv2.imshow('OpenCV',im)
    key = cv2.waitKey(10)
    if key == 27 :
        break
