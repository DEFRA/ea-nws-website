import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import time

home_page = "http://localhost:3000/"
index = "http://localhost:3000/index"
previous_page = "http://localhost:3000/signup/register-location/search-results"
proximity_alert_page = "http://localhost:3000/signup/register-location/location-in-proximity-area/alert"
alert_area_page = "http://localhost:3000/signup/register-location/location-in-alert-area"

english_postcode_nearby_alert = "M1 1AE"
alert_address_xpath = f"//a[contains(text(),'Apartment 1')]"

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
    time.sleep(3)
    address_postcode_input_xpath = "//label[text()='Address with postcode']/ancestor::div/following-sibling::div//input[@type='text']"
    address_postcode_input = browser.find_element(By.XPATH, address_postcode_input_xpath)
    address_postcode_input.send_keys(postcode)
    continue_button_xpath = f"//button[text()='Continue']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(5)
    address_nearby_link = browser.find_element(By.XPATH, address_xpath)
    browser.execute_script("arguments[0].click();", address_nearby_link)
    time.sleep(5)
    return browser

def test_search_location_nearby_alert_render(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_nearby_alert, alert_address_xpath)
    assert browser.current_url == proximity_alert_page
    assert "You can get flood messages near this location" in browser.page_source
    assert "Flood message areas nearby are highlighted in orange on the map." in browser.page_source
    assert "Lower River Irwell catchment including areas in Greater Manchester" in browser.page_source
    assert "Middle River Mersey catchment including areas near Bramhall, Stockport, Sale, Altrincham and Urmston" in browser.page_source
    assert "Select a nearby area" in browser.page_source 
    assert "Flood alert area" in browser.page_source 
    assert "Confirm" in browser.page_source 
    assert "Choose different location" in browser.page_source 

def test_search_location_nearby_warning_back(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_nearby_alert, alert_address_xpath)
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    time.sleep(3)
    assert browser.current_url == previous_page

def test_search_location_nearby_alert_choose_different_location(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_nearby_alert, alert_address_xpath)
    different_location_button_xpath = f"//a[text()='Choose different location']"
    different_location_button = browser.find_element(By.XPATH, different_location_button_xpath)
    browser.execute_script("arguments[0].click();", different_location_button)
    time.sleep(1)
    assert browser.current_url == previous_page

def test_search_location_nearby_alert_confirm_error(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_nearby_alert, alert_address_xpath)
    confirm_button_xpath = f"//button[text()='Confirm']"
    confirm_button = browser.find_element(By.XPATH, confirm_button_xpath)
    browser.execute_script("arguments[0].click();", confirm_button)
    time.sleep(1)
    assert browser.current_url == proximity_alert_page
    assert 'There is a problem' in browser.page_source

def test_search_location_nearby_alert_confirm(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_nearby_alert, alert_address_xpath)
    address_postcode_radio_xpath = "//label[contains(text(), '1. Lower River Irwell catchment including areas in Greater Manchester')]/preceding-sibling::input[@type='radio']"
    address_postcode_radio = browser.find_element(By.XPATH, address_postcode_radio_xpath)
    browser.execute_script("arguments[0].click();", address_postcode_radio)
    confirm_button_xpath = f"//button[text()='Confirm']"
    confirm_button = browser.find_element(By.XPATH, confirm_button_xpath)
    browser.execute_script("arguments[0].click();", confirm_button)
    time.sleep(1)
    assert browser.current_url == alert_area_page






