import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/signup/accountname/add"
nextPage = "http://localhost:3000/declaration"
previousPage = "http://localhost:3000/signup/contactpreferences"
index = "http://localhost:3000/index"

def setup_empty_profile(get_browser):
    browser = get_browser
    browser.get(index)
    button_xpath = f"//button[text()='Activate/Deactivate Empty profile - Used for sign up tests']"
    mock_empty_profile_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_empty_profile_link)
    time.sleep(3)
    return browser

def test_SignUpAccountName_render(get_browser):
    browser = setup_empty_profile(get_browser) 
    browser.get(url)
    assert "Enter your full name" in browser.page_source
    assert "We'll use this name if we need to contact you about your account." in browser.page_source
    assert browser.current_url == url

def test_SignUpAccountName_emptyFullName(get_browser):
    browser = setup_empty_profile(get_browser) 
    browser.get(url)
    browser.find_element(By.NAME, "Full name").send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter your full name" in browser.page_source
    assert browser.current_url == url

def test_SignUpAccountName_FullNameTooLong(get_browser):
    browser = setup_empty_profile(get_browser) 
    browser.get(url)
    browser.find_element(By.NAME, "Full name").send_keys("AbcdefghijAbcdefghijAbcdefghijAbcdefghijAbcdefghijA")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Full name must be 50 characters or fewer" in browser.page_source
    assert browser.current_url == url

'''
TO DO - WILL WORK ONCE REACT STORE IS MOCKED
def test_SignUpAccountName_backButton(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    browser.implicitly_wait(1)
    assert browser.current_url == previousPage

def test_SignUpAccountName_validFullName(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.NAME, "Full name").send_keys("Valid Full Name")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    browser.implicitly_wait(10)
    assert browser.current_url == nextPage
'''