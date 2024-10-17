import os
import time
import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from common import *

previousPage = "http://localhost:3000/index"
currentPage = "http://localhost:3000/organisation/manage-locations/add/upload-file"
nextPage = "http://localhost:3000/organisation/manage-locations/add/upload-file/loading"

currentDir = os.path.dirname(__file__)
validFilePath = os.path.join(currentDir, "valid.csv")
invalidFilePath = os.path.join(currentDir, "invalid.txt")

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
    
    file_input = browser.find_element(By.ID, 'file-upload')
    file_input.send_keys(invalidFilePath)
        
    assert "The selected file must be .xls, .xlsx or .csv" in browser.page_source
    assert browser.current_url == currentPage

def test_valid_file(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, currentPage)
    
    file_input = browser.find_element(By.ID, 'file-upload')
    file_input.send_keys(validFilePath)
    click_button(browser, "Upload", nextPage)

    assert "Scanning Upload" in browser.page_source
    assert browser.current_url == nextPage