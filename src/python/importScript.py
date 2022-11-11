from argparse import Action
import os
import time
from dotenv import load_dotenv

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome import options as chromeOptions
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC

load_dotenv()
TARGET_URL=os.getenv("TARGET_URL")
CSV_URL=os.getenv("CSV_URL")
ADMIN_USER=os.getenv("ADMIN_USER")
ADMIN_PWD=os.getenv("ADMIN_PWD")

s=Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=s)
driver.maximize_window()

driver.get(TARGET_URL)

login_link = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "submit_login")))
email_field = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "email")))
pwd_field = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.ID, "passwd")))

email_field.send_keys(ADMIN_USER)
pwd_field.send_keys(ADMIN_PWD)
login_link.click()

quick_access_button = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="quick_select"]'))).click()
import_tab = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="header_quick"]/div/ul/li[4]'))).click()

import_options = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="entity"]/option[2]'))).click()
file_selector = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, 
'//*[@id="main-div"]/div/div/div/div[2]/div/div/div[1]/form/div/div[1]/div[5]/div/div[2]/button'))).click() 
cat_file = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH,  
'//*[@id="fileHistoryTable"]/tbody/tr[4]/td[2]/div/button[1]'))).click()

time.sleep(2)

same_key = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, 
'//*[@id="main-div"]/div/div/div/div[2]/div/div/div[1]/form/div/div[1]/div[12]/div[2]/div/div'))).click()
regenerate_miniatures = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH,
 '//*[@id="main-div"]/div/div/div/div[2]/div/div/div[1]/form/div/div[1]/div[12]/div[3]/div/div'))).click()
send_notification = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, 
'//*[@id="main-div"]/div/div/div/div[2]/div/div/div[1]/form/div/div[1]/div[12]/div[5]/div/div'))).click()

time.sleep(2)

next_step = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH,  
'//*[@id="main-div"]/div/div/div/div[2]/div/div/div[1]/form/div/div[2]/div/button'))).click()

load_template = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="loadImportMatchs"]'))).click()
import_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="import"]'))).click()

time.sleep(2)

close_import = WebDriverWait(driver, 1000000).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="import_close_button"]'))).click()

edit_file_selector = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, 
'//*[@id="main-div"]/div/div/div/div[2]/div/div/div[1]/form/div/div[1]/div[7]/button'))).click()
file_selector = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, 
'//*[@id="main-div"]/div/div/div/div[2]/div/div/div[1]/form/div/div[1]/div[5]/div/div[2]/button'))).click()
es_file = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, 
'//*[@id="fileHistoryTable"]/tbody/tr[2]/td[2]/div/button[1]'))).click()

time.sleep(2)

select_es_language = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="iso_lang"]/option[3]'))).click()

time.sleep(2)

next_step = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, 
'//*[@id="main-div"]/div/div/div/div[2]/div/div/div[1]/form/div/div[2]/div/button'))).click()

es_template = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, '//*[@id="18"]'))).click()
load_template = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="loadImportMatchs"]'))).click()
import_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="import"]'))).click()    

time.sleep(2)

close_import = WebDriverWait(driver, 1000000).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="import_close_button"]'))).click()

edit_file_selector = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH,
 '//*[@id="main-div"]/div/div/div/div[2]/div/div/div[1]/form/div/div[1]/div[7]/button'))).click()
file_selector = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, 
'//*[@id="main-div"]/div/div/div/div[2]/div/div/div[1]/form/div/div[1]/div[5]/div/div[2]/button'))).click()
en_file = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, 
'//*[@id="fileHistoryTable"]/tbody/tr[3]/td[2]/div/button[1]'))).click()

time.sleep(2)

select_en_language = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="iso_lang"]/option[2]'))).click()
next_step = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, 
'//*[@id="main-div"]/div/div/div/div[2]/div/div/div[1]/form/div/div[2]/div/button'))).click()

en_template = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, '//*[@id="18"]'))).click()
load_template = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="loadImportMatchs"]'))).click()
import_btn = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="import"]'))).click()    

time.sleep(2)

close_import = WebDriverWait(driver, 1000000).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="import_close_button"]'))).click()

time.sleep(1)
dashboard = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="tab-AdminDashboard"]'))).click()
quick_access_button = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="quick_select"]'))).click()
import_tab = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="header_quick"]/div/ul/li[7]'))).click()
restore_index = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="alias_fieldset_indexation"]/div[2]/a[2]'))).click()

time.sleep(2)
dashboard_search = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="tab-AdminDashboard"]'))).click()
quick_access_button_search = WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="quick_select"]'))).click()
search_tab = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="header_quick"]/div/ul/li[3]'))).click()
eng_selector = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="export_language"]/option[1]'))).click()
select_client = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="export_customers"]'))).click()
select_orders = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="export_orders"]'))).click()
submit_export = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="configuration_form_submit_btn"]'))).click()
time.sleep(1)