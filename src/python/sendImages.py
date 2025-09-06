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


# import os
# import requests
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()
# API_KEY = os.getenv("PRESTASHOP_API_KEY")  # Your PrestaShop API Key
# API_URL = os.getenv("PRESTASHOP_API_URL")  # Your PrestaShop API URL (e.g., https://yourstore.com/api)

# # Set up your product and image directories
# images_directory = "public/assets/images/compressed/"
# images = os.listdir(images_directory)

# # PrestaShop product ID, this can be dynamic if you have a list of products
# product_id = 1644  # Example product ID (use the appropriate product ID)
# image_urls = []  # To store the URLs of the uploaded images

# # Function to upload an image to PrestaShop via API
# def upload_image_to_prestashop(image_path, product_id):
#     url = f"{API_URL}/images/products/{product_id}"
    
#     # Read image file in binary mode
#     with open(image_path, 'rb') as file:
#         # Make the POST request to upload the image
#         response = requests.post(
#             url,
#             auth=(API_KEY, ''),
#             files={'image': file}
#         )
    
#     if response.status_code == 201:
#         print(f"Image {image_path} uploaded successfully.")
#         return response.json()  # Returns the image data (e.g., image ID)
#     else:
#         print(f"Error uploading {image_path}: {response.status_code}")
#         return None

# # Function to associate the uploaded image with the product (optional but recommended)
# def associate_image_with_product(image_id, product_id):
#     url = f"{API_URL}/images/products/{product_id}/{image_id}"
#     response = requests.put(url, auth=(API_KEY, ''))
    
#     if response.status_code == 200:
#         print(f"Image {image_id} associated with product {product_id}.")
#     else:
#         print(f"Error associating image {image_id} with product {product_id}: {response.status_code}")

# # Loop through images in the directory and upload them
# for image in images:
#     image_path = os.path.join(images_directory, image)
#     image_data = upload_image_to_prestashop(image_path, product_id)
    
#     if image_data:
#         image_id = image_data.get('id')
#         if image_id:
#             # Optionally associate image with product
#             associate_image_with_product(image_id, product_id)
#             image_urls.append(f"{API_URL}/images/products/{product_id}/{image_id}")
            
# # Print the URLs of the uploaded images
# print("\nUploaded Images URLs:")
# for url in image_urls:
#     print(url)