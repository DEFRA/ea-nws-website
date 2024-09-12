import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

home_page = "http://localhost:3000/"
index = "http://localhost:3000/index"
previous_page = "http://localhost:3000/signup/register-location/search-results"
proximity_severe_page = "http://localhost:3000/signup/register-location/location-in-proximity-area/severe"
proximity_alert_page = "http://localhost:3000/signup/register-location/location-in-proximity-area/alert"
severe_warning_area_page = "http://localhost:3000/signup/register-location/location-in-severe-warning-area"

english_postcode_nearby_warning = "TR1 2AF"
warning_address_xpath = f"//a[contains(text(),'Prime Truro')]"

def setup_search_location_result_test(get_browser, postcode, address_xpath):
    browser = get_browser
    browser.get(index)
    button_xpath = f"//button[text()='Activate/Deactivate Empty profile - Used for sign up tests']"
    mock_empty_profile_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_empty_profile_link)
    time.sleep(1)
    browser.get(home_page)
    signup_button_xpath = f"//button[text()='Sign up for the first time']"
    signup_link = browser.find_element(By.XPATH, signup_button_xpath)
    browser.execute_script("arguments[0].click();", signup_link)
    time.sleep(1)
    address_postcode_radio_xpath = "//label[text()='Address with postcode']/preceding-sibling::input[@type='radio']"
    address_postcode_radio = browser.find_element(By.XPATH, address_postcode_radio_xpath)
    browser.execute_script("arguments[0].click();", address_postcode_radio)
    time.sleep(1)
    address_postcode_input_xpath = "//label[text()='Address with postcode']/ancestor::div/following-sibling::div//input[@type='text']"
    address_postcode_input = browser.find_element(By.XPATH, address_postcode_input_xpath)
    address_postcode_input.send_keys(postcode)
    continue_button_xpath = f"//button[text()='Continue']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(3)
    address_nearby_link = browser.find_element(By.XPATH, address_xpath)
    browser.execute_script("arguments[0].click();", address_nearby_link)
    time.sleep(3)
    return browser

def test_search_location_nearby_warning_render(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_nearby_warning, warning_address_xpath)
    assert browser.current_url == proximity_severe_page
    assert "You can get flood messages near this location" in browser.page_source
    assert "Flood message areas nearby are highlighted in red on the map." in browser.page_source
    assert "Severe flood warnings and flood warnings area" in browser.page_source
    assert "South Cornwall coast at Truro" in browser.page_source
    assert "River Kenwyn at Truro" in browser.page_source
    assert "Select a nearby area" in browser.page_source 
    assert "Skip to other areas nearby" in browser.page_source 

def test_search_location_nearby_warning_back(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_nearby_warning, warning_address_xpath)
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    time.sleep(3)
    assert browser.current_url == previous_page

def test_search_location_nearby_warning_choose_different_location(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_nearby_warning, warning_address_xpath)
    different_location_button_xpath = f"//a[text()='Choose different location']"
    different_location_button = browser.find_element(By.XPATH, different_location_button_xpath)
    browser.execute_script("arguments[0].click();", different_location_button)
    time.sleep(1)
    assert browser.current_url == previous_page

def test_search_location_nearby_warning_confirm_error(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_nearby_warning, warning_address_xpath)
    time.sleep(1)
    confirm_button_xpath = f"//button[text()='Confirm']"
    confirm_button = browser.find_element(By.XPATH, confirm_button_xpath)
    browser.execute_script("arguments[0].click();", confirm_button)
    time.sleep(1)
    assert browser.current_url == proximity_severe_page
    assert 'There is a problem' in browser.page_source

def test_search_location_nearby_warning_confirm(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_nearby_warning, warning_address_xpath)
    time.sleep(1)
    address_postcode_radio_xpath = "//label[contains(text(), 'River Kenwyn at Truro')]/preceding-sibling::input[@type='radio']"
    address_postcode_radio = browser.find_element(By.XPATH, address_postcode_radio_xpath)
    browser.execute_script("arguments[0].click();", address_postcode_radio)
    confirm_button_xpath = f"//button[text()='Confirm']"
    confirm_button = browser.find_element(By.XPATH, confirm_button_xpath)
    browser.execute_script("arguments[0].click();", confirm_button)
    time.sleep(1)
    assert browser.current_url == severe_warning_area_page
    assert "You can get severe flood warnings and flood warnings for this location" in browser.page_source
    assert "Severe flood warnings and flood warnings area" in browser.page_source
    assert "could be a danger to life or property" in browser.page_source
    assert "Flood warnings are usually sent 30 minutes to 2 hours before flooding" in browser.page_source
    assert "Confirm you want this location" in browser.page_source
    assert "Choose different location" in browser.page_source

def test_search_location_nearby_warning_skip(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_nearby_warning, warning_address_xpath)
    time.sleep(1)
    skip_button_xpath = f"//button[text()='Skip to other areas nearby']"
    skip_button = browser.find_element(By.XPATH, skip_button_xpath)
    browser.execute_script("arguments[0].click();", skip_button)    
    time.sleep(1)
    assert browser.current_url == proximity_alert_page





