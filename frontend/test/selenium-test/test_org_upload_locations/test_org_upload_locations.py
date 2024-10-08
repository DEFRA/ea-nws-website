import os
import time
import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from common import *

previousPage = "http://localhost:3000/index"
currentPage = "http://localhost:3000/organisation/manage-locations/add/upload-file"
nextPage = "http://localhost:3000/organisation/manage-locations/add/upload-file/loading"

validFilePath = os.path.join(os.getcwd(), "valid.csv")
invalidFilePath = os.path.join(os.getcwd(), "invalid.txt")

def test_render_page(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, currentPage)
    assert "Upload file" in browser.page_source
    assert browser.current_url == currentPage

def test_cancel(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, currentPage)
    click_link(browser, "Cancel", previousPage) # Cancel uses navigate(-1), index page for tests
    assert browser.current_url != currentPage

def test_empty_file(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, currentPage)
    click_button(browser, "Upload", currentPage)
    assert "The file is empty" in browser.page_source
    assert browser.current_url == currentPage

def test_invalid_file(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, currentPage)
    
    with open(invalidFilePath, "w") as f:
        f.write("Invalid location file")

    file_input = browser.find_element(By.ID, 'file-upload')
    file_input.send_keys(invalidFilePath)
    
    time.sleep(2)
    
    assert "The selected file must be .xls, .xlsx or .csv" in browser.page_source
    assert browser.current_url == currentPage
    os.remove(invalidFilePath)

def test_valid_file(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, currentPage)
    
    csvHeaders = [
        "Location name", "Full address", "Postcode", "X coordinates", "Y coordinates", 
        "Internal reference", "Business criticality", "Location type", "Action plan", 
        "Notes", "Keyword 1 for Location", "Keyword 2 for Location", "Keyword 3 for Location", 
        "Keyword 4 for Location", "Keyword 5 for Location", "Keyword 6 for Location", 
        "Keyword 7 for Location", "Keyword 8 for Location", "Keyword 9 for Location", 
        "Keyword 10 for Location", "Keyword 11 for Location", "Keyword 12 for Location", 
        "Keyword 13 for Location", "Keyword 14 for Location", "Keyword 15 for Location", 
        "Keyword 16 for Location", "Keyword 17 for Location", "Keyword 18 for Location", 
        "Keyword 19 for Location", "Keyword 20 for Location", "Keyword 21 for Location", 
        "Keyword 22 for Location", "Keyword 23 for Location", "Keyword 24 for Location", 
        "Keyword 25 for Location", "Keyword 26 for Location", "Keyword 27 for Location", 
        "Keyword 28 for Location", "Keyword 29 for Location", "Keyword 30 for Location", 
        "Keyword 31 for Location", "Keyword 32 for Location", "Keyword 33 for Location", 
        "Keyword 34 for Location", "Keyword 35 for Location", "Keyword 36 for Location", 
        "Keyword 37 for Location", "Keyword 38 for Location", "Keyword 39 for Location", 
        "Keyword 40 for Location", "Keyword 41 for Location", "Keyword 42 for Location", 
        "Keyword 43 for Location", "Keyword 44 for Location", "Keyword 45 for Location", 
        "Keyword 46 for Location", "Keyword 47 for Location", "Keyword 48 for Location", 
        "Keyword 49 for Location", "Keyword 50 for Location"
    ]
    with open(validFilePath, "w", newline='') as f:
        writer = csv.writer(f)
        writer.writerow(csvHeaders)

    file_input = browser.find_element(By.ID, 'file-upload')
    file_input.send_keys(validFilePath)
    click_button(browser, "Upload", nextPage)

    print(browser.current_url)
    assert "Scanning Upload" in browser.page_source
    assert browser.current_url == nextPage
    os.remove(validFilePath)