import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

home_page = "http://localhost:3000/"
index = "http://localhost:3000/index"
previous_page = "http://localhost:3000/signup/register-location/search"
next_page = "http://localhost:3000/"
url = "http://localhost:3000/signup/register-location/search-results"
english_postcode_severe_warning = "SW1A 0AA"
english_postcode_alert = "NW10 8TZ"
english_postcode_nearby_warning = "TR1 2AF"
severe_warning_area_page = "http://localhost:3000/signup/register-location/location-in-severe-warning-area"
alert_page = "http://localhost:3000/signup/register-location/location-in-alert-area"
proximity_severe_page = "http://localhost:3000/signup/register-location/location-in-proximity-area/severe"
# TODO Currently no_flood_area page is never shown, will need to implement bellow 
# test once it's fixed
# english_postcode_noflood = "E1W 1YN"

def setup_search_location_result_test(get_browser, postcode):
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
    return browser

def test_search_location_result_render(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_severe_warning) 
    assert browser.current_url == url
    assert "Select an address" in browser.page_source
    assert "Postcode: SW1A 0AA" in browser.page_source

def test_search_location_change_postcode(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_severe_warning) 
    change_postcode_link_xpath = f"//a[text()='Change postcode']"
    change_postcode_link = browser.find_element(By.XPATH, change_postcode_link_xpath)
    browser.execute_script("arguments[0].click();", change_postcode_link)
    time.sleep(1)
    assert browser.current_url == previous_page
    assert "Check if you can get flood messages for your location" in browser.page_source
    assert "Select how you want to search" in browser.page_source

def test_search_location_cannot_find_address(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_severe_warning) 
    cannot_find_address_link_xpath = "//span[contains(text(), 'I cannot find my address here')]"
    cannot_find_address_link = browser.find_element(By.XPATH, cannot_find_address_link_xpath)
    browser.execute_script("arguments[0].click();", cannot_find_address_link)
    assert browser.current_url == url
    assert "You can view flood message areas" in browser.page_source

def test_search_location_back_button(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_severe_warning) 
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    time.sleep(1)
    assert browser.current_url == previous_page

def test_search_location_severe_warning(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_severe_warning) 
    address_warning_link_xpath = f"//a[contains(text(), 'House Of Commons')]"
    address_warning_link = browser.find_element(By.XPATH, address_warning_link_xpath)
    browser.execute_script("arguments[0].click();", address_warning_link)
    time.sleep(3)
    assert browser.current_url == severe_warning_area_page

def test_search_location_alert(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_alert) 
    address_alert_link_xpath = "//a[contains(text(), '48, Kingfisher Way')]"
    address_alert_link = browser.find_element(By.XPATH, address_alert_link_xpath)
    browser.execute_script("arguments[0].click();", address_alert_link)
    time.sleep(3)
    assert browser.current_url == alert_page

def test_search_location_nearby_warning_render(get_browser):
    browser = setup_search_location_result_test(get_browser, english_postcode_nearby_warning) 
    address_nearby_link_xpath = f"//a[contains(text(),'Prime Truro')]"
    address_nearby_link = browser.find_element(By.XPATH, address_nearby_link_xpath)
    browser.execute_script("arguments[0].click();", address_nearby_link)
    time.sleep(3)
    assert browser.current_url == proximity_severe_page
