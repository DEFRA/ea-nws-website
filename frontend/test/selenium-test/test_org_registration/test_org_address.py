import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/organisation/sign-up/address"
nextPage = "http://localhost:3000/organisation/sign-up/address-search"

def test__empty_input(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter a postcode in England, in the correct format, like KT3 3QQ" in browser.page_source
    assert browser.current_url == url

def test_invalid_input(get_browser):
    browser = get_browser
    browser.get(url)
    input_field = browser.find_element(By.NAME, "Postcode")
    input_field.send_keys("invalid postcode")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter a postcode in the correct format, like KT3 3QQ" in browser.page_source
    assert browser.current_url == url

def test_valid_input(get_browser):
    browser = get_browser
    browser.get(url)
    input_field = browser.find_element(By.NAME, "Postcode")
    input_field.send_keys("KT3 3QQ")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == nextPage