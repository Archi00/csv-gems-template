import ftplib
import os
from dotenv import load_dotenv
import zipfile

def main():
    load_dotenv()
    FTP_SERVER=os.getenv("FTP_SERVER")
    FTP_USER=os.getenv("FTP_USER")
    FTP_PWD=os.getenv("FTP_PWD")
    FTP_UPLOAD_PATH=os.getenv("FTP_CSV_PUBLIC_PATH")
    FTP_CSV_PATH=os.getenv("FTP_DOWNLOADS")

    session = ftplib.FTP(FTP_SERVER,FTP_USER,FTP_PWD)
    file = open("public/assets/datafeed/products_combinations_sql.csv", "rb")
    print(FTP_UPLOAD_PATH)
    session.storbinary("STOR {0}".format(FTP_UPLOAD_PATH), file)
    file.close()
    session.quit()
    return 0

main()
