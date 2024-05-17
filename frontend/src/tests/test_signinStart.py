import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3001/signin"
nextPage = "http://localhost:3001/signin/validate"

def test_SignInStart_render(get_browser):
    browser = get_browser
    browser.get(url)
    assert browser.title == "React App"
    assert "Sign in to your flood warnings account" in browser.page_source
    assert browser.current_url == url

def test_SignInStart_backButton(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == "http://localhost:3001/"

def test_SignInStart_emptyEmail(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.ID, "emailAddress").send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter your email address" in browser.page_source
    assert browser.current_url == url

def test_SignInStart_incorrectFormatEmail(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.ID, "emailAddress").send_keys("invalid@.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter an email address in the correct format, like name@example.com" in browser.page_source
    assert browser.current_url == url

def test_SignInStart_invalidEmail(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.ID, "emailAddress").send_keys("invalid@email.com")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert "Email address is not recognised - check and try again" in browser.page_source
    assert browser.current_url == url
    
def test_SignInStart_validEmail(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.ID, "emailAddress").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == nextPage



