import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

index = "http://localhost:3000/index"
previousPage = "http://localhost:3000/signup/register-location/search"
nextPage = "http://localhost:3000/"
url = "http://localhost:3000/signup/register-location/search-results"
english_postcode = "SW1A 0AA"

def setup_search_location_result_test(get_browser):
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
    time.sleep(1)
    address_postcode_radio_xpath = "//label[text()='Address with postcode']/preceding-sibling::input[@type='radio']"
    address_postcode_radio = browser.find_element(By.XPATH, address_postcode_radio_xpath)
    browser.execute_script("arguments[0].click();", address_postcode_radio)
    time.sleep(1)
    address_postcode_input_xpath = "//label[text()='Address with postcode']/ancestor::div/following-sibling::div//input[@type='text']"
    address_postcode_input = browser.find_element(By.XPATH, address_postcode_input_xpath)
    address_postcode_input.send_keys(english_postcode)
    continue_button_xpath = f"//button[text()='Continue']"
    continue_button = browser.find_element(By.XPATH, continue_button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(1)
    return browser

def test_search_location_result_render(get_browser):
    browser = setup_search_location_result_test(get_browser) 
    assert browser.current_url == url
    assert "Check if you can get flood messages for your location" in browser.page_source
    assert "Select how you want to search" in browser.page_source

def test_search_location_back_button(get_browser):
    browser = setup_search_location_result_test(get_browser) 
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == previousPage
