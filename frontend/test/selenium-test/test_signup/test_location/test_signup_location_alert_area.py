import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

home_page = "http://localhost:3000/"
index = "http://localhost:3000/index"
previous_page = "http://localhost:3000/signup/register-location/search-results"
severe_warning_area_page = "http://localhost:3000/signup/register-location/location-in-severe-warning-area"
current_page = "http://localhost:3000/signup/register-location/location-in-alert-area"
next_page = "http://localhost:3000/signup"
english_postcode_severe_warning = "SW1A 0AA"
english_postcode_alert = "NW10 8TZ"
alert_address_alert_link_xpath = "//a[contains(text(), '48, Kingfisher Way')]"
warning_address_link_xpath = "//a[contains(text(), 'House Of Commons')]"
def setup_location_alert_test(get_browser, postcode, address_xpath):
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
    address_link = browser.find_element(By.XPATH, address_xpath)
    browser.execute_script("arguments[0].click();", address_link)
    time.sleep(3)
    return browser

def test_location_alert_render(get_browser):
    browser = setup_location_alert_test(get_browser, english_postcode_alert, alert_address_alert_link_xpath) 
    time.sleep(1)
    assert browser.current_url == current_page
    assert "You can get flood alerts for this location" in browser.page_source
    assert "(optional)" not in browser.page_source
    assert "Flood alert area" in browser.page_source
    assert "These are early alerts of possible flooding to help you be prepared." in browser.page_source
    assert "Confirm you want this location" in browser.page_source
    assert "Choose different location" in browser.page_source

def test_location_warningarea_alert_render(get_browser):
    browser = setup_location_alert_test(get_browser,english_postcode_severe_warning, warning_address_link_xpath) 
    continue_button_xpath = f"//button[text()='Confirm you want this location']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(1)
    assert browser.current_url == current_page
    assert "You can also get flood alerts" in browser.page_source
    assert "(optional)" in browser.page_source
    assert "Flood alert area" in browser.page_source
    assert "These are early alerts of possible flooding to help you be prepared." in browser.page_source
    assert "Yes, I want these" in browser.page_source
    assert "Confirm you want this location" not in browser.page_source
    assert "Choose different location" not in browser.page_source
    assert "Continue" in browser.page_source

def test_location_alert_back(get_browser):
    browser = setup_location_alert_test(get_browser, english_postcode_alert, alert_address_alert_link_xpath) 
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    time.sleep(3)
    assert browser.current_url == previous_page

def test_location_alert_different_location(get_browser):
    browser = setup_location_alert_test(get_browser, english_postcode_alert, alert_address_alert_link_xpath) 
    different_location_button_xpath = f"//a[text()='Choose different location']"
    different_location_button = browser.find_element(By.XPATH, different_location_button_xpath)
    browser.execute_script("arguments[0].click();", different_location_button)
    time.sleep(1)
    assert browser.current_url == previous_page

def test_location_alert_confirm(get_browser):
    browser = setup_location_alert_test(get_browser, english_postcode_alert, alert_address_alert_link_xpath) 
    confirm_location_button_xpath = f"//button[text()='Confirm you want this location']"
    confirm_location_button = browser.find_element(By.XPATH, confirm_location_button_xpath)
    browser.execute_script("arguments[0].click();", confirm_location_button)
    time.sleep(1)
    assert browser.current_url == next_page

def test_location_warning_confirm(get_browser):
    browser = setup_location_alert_test(get_browser,english_postcode_severe_warning, warning_address_link_xpath) 
    confirm_location_button_xpath = f"//button[text()='Confirm you want this location']"
    confirm_location_button = browser.find_element(By.XPATH, confirm_location_button_xpath)
    browser.execute_script("arguments[0].click();", confirm_location_button)
    time.sleep(1)
    continue_button_xpath = f"//button[text()='Continue']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(1)
    assert browser.current_url == next_page

def test_location_warning_alert_checked_confirm(get_browser):
    browser = setup_location_alert_test(get_browser,english_postcode_severe_warning, warning_address_link_xpath) 
    confirm_location_button_xpath = f"//button[text()='Confirm you want this location']"
    confirm_location_button = browser.find_element(By.XPATH, confirm_location_button_xpath)
    browser.execute_script("arguments[0].click();", confirm_location_button)
    time.sleep(1)
    i_want_these_xpath = "//label[text()='Yes, I want these']/preceding-sibling::input[@type='checkbox']"
    i_want_these_checkbox = browser.find_element(By.XPATH, i_want_these_xpath)
    browser.execute_script("arguments[0].click();", i_want_these_checkbox)
    time.sleep(1)
    continue_button_xpath = f"//button[text()='Continue']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(1)
    assert browser.current_url == next_page
