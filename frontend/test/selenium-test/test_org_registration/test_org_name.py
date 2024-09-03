import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/organisation/sign-up"
nextPage = "http://localhost:3000/organisation/sign-up/address"

def test__empty_input(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter your organisation's name" in browser.page_source
    assert browser.current_url == url

def test_valid_input(get_browser):
    browser = get_browser 
    browser.get(url)
    input_field = browser.find_element(By.NAME, "Organisation name")
    input_field.send_keys("Valid Organisation Name")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1) 
    assert browser.current_url == nextPage
