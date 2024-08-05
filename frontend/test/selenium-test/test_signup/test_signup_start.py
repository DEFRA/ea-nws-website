import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/signup"
nextPage = "http://localhost:3000/signup/validate"
previousPage = "http://localhost:3000"
duplicateEmail = "http://localhost:3000/signup/duplicate"
index = "http://localhost:3000/index"

def setup_empty_profile(get_browser):
    browser = get_browser
    browser.get(index)
    button_xpath = f"//button[text()='Activate/Deactivate Empty profile - Used for sign up tests']"
    mock_empty_profile_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_empty_profile_link)
    time.sleep(3)
    return browser


def test_SignUpStart_render(get_browser):
    browser = setup_empty_profile(get_browser) 
    browser.get(url)
    assert "Enter an email address - you'll use this to sign in to your account" in browser.page_source
    assert browser.current_url == url

def test_SignUpStart_backButton(get_browser):
    browser = setup_empty_profile(get_browser) 
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == url

def test_SignUpStart_emptyEmail(get_browser):
    browser = setup_empty_profile(get_browser) 
    browser.get(url)
    browser.find_element(By.NAME, "Email address").send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter your email address" in browser.page_source
    assert browser.current_url == url

def test_SignUpStart_incorrectFormatEmail(get_browser):
    browser = setup_empty_profile(get_browser) 
    browser.get(url)
    browser.find_element(By.NAME, "Email address").send_keys("invalid@.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter an email address in the correct format, like name@example.com" in browser.page_source
    assert browser.current_url == url

def test_SignUpStart_validEmail(get_browser):
    browser = setup_empty_profile(get_browser) 
    browser.get(url)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(3)
    assert browser.current_url == nextPage

def test_SignUpStart_duplicateEmail(get_browser):
    browser = setup_empty_profile(get_browser) 
    browser.get(url)
    browser.find_element(By.NAME, "Email address").send_keys("duplicate@email.com")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(3)
    assert browser.current_url == duplicateEmail

