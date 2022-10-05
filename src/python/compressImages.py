from pickletools import optimize
import PIL
from PIL import Image
import os
path =  "public/assets/images/gems/"
export_path = "public/assets/images/compressed/"
images = os.listdir(path)

def compress():
    for image in images:
        image_name = image.rsplit('.',1)[0]
        image = Image.open(path+image)
        image = image.resize((800 , 800))
        image.save(export_path+image_name+'.jpeg', 'jpeg', optimize=True, quality=90)
compress()
