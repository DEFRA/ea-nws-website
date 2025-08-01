import os
from selenium.webdriver.common.by import By
from common import *

startPage = url_org_man_loc.get("add").get("options")
infoPage = url_org_man_loc.get("add").get("addressInfo")
mainPage = url_org_man_loc.get("add").get("uploadFile")
nextPage = url_org_man_loc.get("add").get("loading")

currentDir = os.path.dirname(__file__)
validFilePath = os.path.join(currentDir, "valid.csv")
invalidFilePath = os.path.join(currentDir, "invalid.txt")

def test_page_flow(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, startPage)
    assert "How do you want to add locations?" in browser.page_source
    select_input_radio_option(browser, "BulkCoordinates")
    click_button(browser, "Continue", infoPage)
    assert "How to upload a file with addresses and postcodes" in browser.page_source
    click_button(browser, "Continue", mainPage)
    assert "Upload file" in browser.page_source
    assert browser.current_url == mainPage

def test_cancel(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, mainPage)
    click_link(browser, "Cancel", url_index) # Cancel uses navigate(-1), index page for tests
    assert browser.current_url != mainPage

def test_empty_file(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, mainPage)
    click_button(browser, "Upload", mainPage)
    assert "The file is empty" in browser.page_source
    assert browser.current_url == mainPage

# The following tests fail on Bamboo (possibly due to file handling):
#
# def test_invalid_file(get_browser):
#     browser = get_browser
#     navigate_to_auth_page_via_index(browser, mainPage)
    
#     file_input = browser.find_element(By.ID, 'file-upload')
#     file_input.send_keys(invalidFilePath)
        
#     assert "The selected file must be .csv" in browser.page_source
#     assert browser.current_url == mainPage

# def test_valid_file(get_browser):
#     browser = get_browser
#     navigate_to_auth_page_via_index(browser, mainPage)
    
#     file_input = browser.find_element(By.ID, 'file-upload')
#     file_input.send_keys(validFilePath)
#     click_button(browser, "Upload", nextPage)

#     assert "Scanning upload" in browser.page_source
#     assert browser.current_url == nextPage