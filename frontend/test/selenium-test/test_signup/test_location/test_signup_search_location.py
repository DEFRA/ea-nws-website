import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

index = "http://localhost:3000/index"
url = "http://localhost:3000/signup/register-location/search"
previousPage = "http://localhost:3000/"
nextPage = "http://localhost:3000/signup/register-location/search-results"
scottish_postcode = 'G3 8EP'
english_postcode = "SW1A 0AA"

def setup_search_location_test(get_browser):
    browser = get_browser
    browser.get(index)
    button_xpath = f"//button[text()='Activate/Deactivate Empty profile - Used for sign up tests']"
    mock_empty_profile_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_empty_profile_link)
    time.sleep(1)
    browser.get(previousPage)
    signup_button_xpath = f"//button[text()='Sign up for the first time']"
    signup_link = browser.find_element(By.XPATH, signup_button_xpath)
    browser.execute_script("arguments[0].click();", signup_link)
    return browser

def test_search_location_render(get_browser):
    browser = setup_search_location_test(get_browser) 
    assert browser.current_url == url
    assert "Check if you can get flood messages for your location" in browser.page_source
    assert "Select how you want to search" in browser.page_source

def test_search_location_back_button(get_browser):
    browser = setup_search_location_test(get_browser) 
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == previousPage

def test_search_location_empty_postcodeField(get_browser):
    browser = setup_search_location_test(get_browser) 
    address_postcode_radio_xpath = "//label[text()='Address with postcode']/preceding-sibling::input[@type='radio']"
    address_postcode_radio = browser.find_element(By.XPATH, address_postcode_radio_xpath)
    browser.execute_script("arguments[0].click();", address_postcode_radio)
    time.sleep(1)
    assert "Postcode in England" in browser.page_source
    address_postcode_input_xpath = "//label[text()='Address with postcode']/ancestor::div/following-sibling::div//input[@type='text']"
    address_postcode_input = browser.find_element(By.XPATH, address_postcode_input_xpath)
    address_postcode_input.send_keys("")
    continue_button_xpath = f"//button[text()='Continue']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    assert browser.current_url==url 
    assert "Enter a postcode in England, in the correct format, like KT3 3QQ" in browser.page_source

def test_search_location_invalidpostcode(get_browser):
    browser = setup_search_location_test(get_browser) 
    address_postcode_radio_xpath = "//label[text()='Address with postcode']/preceding-sibling::input[@type='radio']"
    address_postcode_radio = browser.find_element(By.XPATH, address_postcode_radio_xpath)
    browser.execute_script("arguments[0].click();", address_postcode_radio)
    time.sleep(1)
    assert "Postcode in England" in browser.page_source
    address_postcode_input_xpath = "//label[text()='Address with postcode']/ancestor::div/following-sibling::div//input[@type='text']"
    address_postcode_input = browser.find_element(By.XPATH, address_postcode_input_xpath)
    address_postcode_input.send_keys('sw')
    continue_button_xpath = f"//button[text()='Continue']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    assert browser.current_url==url 
    assert "Enter a postcode in the correct format, like KT3 3QQ" in browser.page_source

def test_search_location_notenglishpostcode(get_browser):
    browser = setup_search_location_test(get_browser) 
    address_postcode_radio_xpath = "//label[text()='Address with postcode']/preceding-sibling::input[@type='radio']"
    address_postcode_radio = browser.find_element(By.XPATH, address_postcode_radio_xpath)
    browser.execute_script("arguments[0].click();", address_postcode_radio)
    time.sleep(1)
    assert "Postcode in England" in browser.page_source
    address_postcode_input_xpath = "//label[text()='Address with postcode']/ancestor::div/following-sibling::div//input[@type='text']"
    address_postcode_input = browser.find_element(By.XPATH, address_postcode_input_xpath)
    address_postcode_input.send_keys(scottish_postcode)
    continue_button_xpath = f"//button[text()='Continue']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(1)
    assert browser.current_url==url 
    assert "Enter a full postcode in England" in browser.page_source

def test_search_location_englishpostcode(get_browser):
    browser = setup_search_location_test(get_browser) 
    address_postcode_radio_xpath = "//label[text()='Address with postcode']/preceding-sibling::input[@type='radio']"
    address_postcode_radio = browser.find_element(By.XPATH, address_postcode_radio_xpath)
    browser.execute_script("arguments[0].click();", address_postcode_radio)
    time.sleep(1)
    assert "Postcode in England" in browser.page_source
    address_postcode_input_xpath = "//label[text()='Address with postcode']/ancestor::div/following-sibling::div//input[@type='text']"
    address_postcode_input = browser.find_element(By.XPATH, address_postcode_input_xpath)
    address_postcode_input.send_keys(english_postcode)
    continue_button_xpath = f"//button[text()='Continue']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(1)
    assert browser.current_url==nextPage 
    assert "Select an address" in browser.page_source
    assert "House Of Commons" in browser.page_source

def test_search_location_empty_nameField(get_browser):
    browser = setup_search_location_test(get_browser) 
    address_postcode_radio_xpath = "//label[text()='Place name, town or keyword']/preceding-sibling::input[@type='radio']"
    address_postcode_radio = browser.find_element(By.XPATH, address_postcode_radio_xpath)
    browser.execute_script("arguments[0].click();", address_postcode_radio)
    time.sleep(1)
    assert "Enter a place name, town or keyword" in browser.page_source
    address_postcode_input_xpath = "//label[text()='Place name, town or keyword']/ancestor::div/following-sibling::div//input[@type='text']"
    address_postcode_input = browser.find_element(By.XPATH, address_postcode_input_xpath)
    address_postcode_input.send_keys("")
    continue_button_xpath = f"//button[text()='Continue']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    assert browser.current_url==url 
    assert "Please enter a place name, town or keyword" in browser.page_source

def test_search_location_notenglishtown(get_browser):
    browser = setup_search_location_test(get_browser) 
    address_postcode_radio_xpath = "//label[text()='Place name, town or keyword']/preceding-sibling::input[@type='radio']"
    address_postcode_radio = browser.find_element(By.XPATH, address_postcode_radio_xpath)
    browser.execute_script("arguments[0].click();", address_postcode_radio)
    time.sleep(1)
    assert "Enter a place name, town or keyword" in browser.page_source
    address_postcode_input_xpath = "//label[text()='Place name, town or keyword']/ancestor::div/following-sibling::div//input[@type='text']"
    address_postcode_input = browser.find_element(By.XPATH, address_postcode_input_xpath)
    address_postcode_input.send_keys("Glasgow")
    continue_button_xpath = f"//button[text()='Continue']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    assert browser.current_url==url 
    assert "Enter a place name, town or keyword in England" in browser.page_source

def test_search_location_notenglishtown(get_browser):
    browser = setup_search_location_test(get_browser) 
    address_postcode_radio_xpath = "//label[text()='Place name, town or keyword']/preceding-sibling::input[@type='radio']"
    address_postcode_radio = browser.find_element(By.XPATH, address_postcode_radio_xpath)
    browser.execute_script("arguments[0].click();", address_postcode_radio)
    time.sleep(1)
    assert "Enter a place name, town or keyword" in browser.page_source
    address_postcode_input_xpath = "//label[text()='Place name, town or keyword']/ancestor::div/following-sibling::div//input[@type='text']"
    address_postcode_input = browser.find_element(By.XPATH, address_postcode_input_xpath)
    address_postcode_input.send_keys("Glasgow")
    continue_button_xpath = f"//button[text()='Continue']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(1)
    assert browser.current_url==url 
    assert "Enter a place name, town or keyword in England" in browser.page_source

def test_search_location_london(get_browser):
    browser = setup_search_location_test(get_browser) 
    address_postcode_radio_xpath = "//label[text()='Place name, town or keyword']/preceding-sibling::input[@type='radio']"
    address_postcode_radio = browser.find_element(By.XPATH, address_postcode_radio_xpath)
    browser.execute_script("arguments[0].click();", address_postcode_radio)
    time.sleep(1)
    assert "Enter a place name, town or keyword" in browser.page_source
    address_postcode_input_xpath = "//label[text()='Place name, town or keyword']/ancestor::div/following-sibling::div//input[@type='text']"
    address_postcode_input = browser.find_element(By.XPATH, address_postcode_input_xpath)
    address_postcode_input.send_keys("London")
    continue_button_xpath = f"//button[text()='Continue']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(1)
    assert browser.current_url==nextPage
    assert "City of London" in browser.page_source

