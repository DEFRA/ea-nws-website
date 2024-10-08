import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

home_page = "http://localhost:3000/"
index = "http://localhost:3000/index"
previous_page = "http://localhost:3000/signup/register-location/search-results"
severe_warning_area_page = "http://localhost:3000/signup/register-location/location-in-severe-warning-area"
next_page = "http://localhost:3000/signup/register-location/location-in-alert-area"
search_page = "http://localhost:3000/signup/register-location/search"
english_postcode_severe_warning = "SW1A 0AA"

def setup_location_severewarning_test(get_browser):
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
    address_postcode_input.send_keys(english_postcode_severe_warning)
    continue_button_xpath = f"//button[text()='Continue']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(3)
    address_warning_link_xpath = f"//a[contains(text(), 'House Of Commons')]"
    address_warning_link = browser.find_element(By.XPATH, address_warning_link_xpath)
    browser.execute_script("arguments[0].click();", address_warning_link)
    time.sleep(3)
    return browser

def test_location_severe_warning_render(get_browser):
    browser = setup_location_severewarning_test(get_browser) 
    assert browser.current_url == severe_warning_area_page
    assert "You can get severe flood warnings and flood warnings for this location" in browser.page_source
    assert "House Of Commons" in browser.page_source
    assert "Severe flood warnings and flood warnings area" in browser.page_source
    assert "could be a danger to life or property" in browser.page_source
    assert "Flood warnings are usually sent 30 minutes to 2 hours before flooding" in browser.page_source
    assert "Confirm you want this location" in browser.page_source
    assert "Choose different location" in browser.page_source

def test_location_severe_warning_back(get_browser):
    browser = setup_location_severewarning_test(get_browser) 
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    time.sleep(3)
    assert browser.current_url == previous_page

def test_location_severe_warning_continue(get_browser):
    browser = setup_location_severewarning_test(get_browser) 
    continue_button_xpath = f"//button[text()='Confirm you want this location']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(5)
    assert browser.current_url == next_page

def test_location_severe_warning_differentlocation(get_browser):
    browser = setup_location_severewarning_test(get_browser) 
    time.sleep(3)
    differentlocation_button_xpath = f"//a[text()='Choose different location']"
    differentlocation_button = browser.find_element(By.XPATH, differentlocation_button_xpath)
    browser.execute_script("arguments[0].click();", differentlocation_button)
    time.sleep(3)
    assert browser.current_url == previous_page
