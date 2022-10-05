import ftplib
import os
from dotenv import load_dotenv

load_dotenv()
FTP_SERVER=os.getenv("FTP_SERVER")
FTP_USER=os.getenv("FTP_USER")
FTP_PWD=os.getenv("FTP_PWD")
FTP_UPLOAD_PATH=os.getenv("FTP_UPLOAD_PATH")
FTP_CSV_PATH=os.getenv("FTP_CSV_PATH")

images = os.listdir("public/assets/images/gems")
csvs = os.listdir("src/tables/csv")

session = ftplib.FTP(FTP_SERVER,FTP_USER,FTP_PWD)
for image in images:
    file = open("public/assets/images/compressed/{0}".format(image),'rb')
    session.storbinary("STOR {0}/{1}".format(FTP_UPLOAD_PATH,image), file)
for csv in csvs:
    file = open("src/tables/csv/{0}".format(csv),'rb')
    session.storbinary("STOR {0}/{1}".format(FTP_CSV_PATH,csv), file)
file.close()     
session.quit()