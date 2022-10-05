import ftplib
import os
from dotenv import load_dotenv
import zipfile

load_dotenv()
FTP_SERVER=os.getenv("FTP_SERVER")
FTP_USER=os.getenv("FTP_USER")
FTP_PWD=os.getenv("FTP_PWD")
FTP_UPLOAD_PATH=os.getenv("FTP_CSV_PUBLIC_PATH")
FTP_CSV_PATH=os.getenv("FTP_DOWNLOADS")

print(FTP_CSV_PATH)
with zipfile.ZipFile("{0}/{1}".format(FTP_CSV_PATH, "shop_data_export.zip"), 'r') as zip_ref:
    print(zip_ref)
    zip_ref.extractall("public/assets/datafeed")

session = ftplib.FTP(FTP_SERVER,FTP_USER,FTP_PWD)
file = open("public/assets/datafeed/products_combinations_sql.csv", "rb")
print(FTP_UPLOAD_PATH)
session.storbinary("STOR {0}".format(FTP_UPLOAD_PATH), file)
file.close()
session.quit()
os.remove("{0}/{1}".format(FTP_CSV_PATH, "shop_data_export.zip"))