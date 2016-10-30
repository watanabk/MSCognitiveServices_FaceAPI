import cognitive_face as CF
import cv2
import sys
import urllib
import json
import http.client
import cognitive_face as CF

KEY = 'Your Key'

def display_expression(data,img):
	font = cv2.FONT_HERSHEY_PLAIN
	font_size = 2

	for face in data:
	    f_rec  =  face['faceRectangle']
	    width  =  f_rec['width']
	    height =  f_rec['height']
	    left   =  f_rec['left']
	    top    =  f_rec['top']
	    cv2.rectangle(img,(left,top),(left+width,top+height),(0,200,0),2)

	    f_rec = face['faceAttributes']
	    gender = f_rec['gender']
	    age = f_rec['age']
	    cv2.putText(img, gender, (left, 30+top+height), font, font_size, (0, 200, 0), 2)
	    cv2.putText(img, str(age), (left, 60+top+height), font, font_size, (0, 200, 0), 2)

if __name__ == '__main__':
	if len(sys.argv) < 1:
	    quit()
	file_path = sys.argv[1]
	print(file_path)
	CF.Key.set(KEY)

	data = CF.face.detect(file_path, True, False, 'age,gender')
	print(data)
	
	img = cv2.imread(file_path)
	display_expression(data, img)

	cv2.imshow('image',img)
	cv2.waitKey(0)
	cv2.destroyAllWindows()

	conn.close()