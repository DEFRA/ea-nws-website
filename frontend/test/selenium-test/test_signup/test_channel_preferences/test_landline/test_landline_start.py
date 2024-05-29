import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import helper

previous_url = "http://localhost:3000/signup/contactpreferences"
url = "http://localhost:3000/signup/contactpreferences/landline"
nextPage = "http://localhost:3000/signup/contactpreferences/landline/validate"

def test_landline_start_render(get_browser):
    browser = get_browser
    helper.mock_session(browser)
    browser.get(url)
    assert "Enter a telephone number to get flood messages by phone call" in browser.page_source
    assert browser.current_url == url

def test_landline_start_backButton(get_browser):
    browser = get_browser
    helper.mock_session(browser)
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == previous_url

def test_landline_start_empty_number(get_browser):
    browser = get_browser
    helper.mock_session(browser)
    browser.get(url)
    browser.find_element(By.NAME, "UK landline or mobile telephone number").send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert 'Enter a UK landline or mobile telephone number' in browser.page_source
    assert browser.current_url == url

def test_landline_start_incorrect_format_number(get_browser):
    browser = get_browser
    helper.mock_session(browser)
    browser.get(url)
    browser.find_element(By.NAME, "UK landline or mobile telephone number").send_keys("07123")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert 'Enter a UK landline or mobile telephone number, like 01632 960 001 or 07700 900 982' in browser.page_source
    assert browser.current_url == url

def test_SignInStart_validEmail(get_browser):
    browser = get_browser
    helper.mock_session(browser)
    browser.get(url)
    browser.find_element(By.NAME, "UK landline or mobile telephone number").send_keys("07123455567")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == nextPage



