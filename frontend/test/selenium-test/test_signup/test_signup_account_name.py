import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/signup/accountname/add"
nextPage = "http://localhost:3000/declaration"
previousPage = "http://localhost:3000/signup/contactpreferences"

def test_SignUpAccountName_render(get_browser):
    browser = get_browser
    browser.get(url)
    assert "Enter your name" in browser.page_source
    assert "We'll use this if we need to contact you about your account." in browser.page_source
    assert browser.current_url == url

def test_SignUpAccountName_emptyFullName(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.NAME, "Full name").send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter your full name" in browser.page_source
    assert browser.current_url == url

def test_SignUpAccountName_FullNameTooLong(get_browser):
    browser = get_browser
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
    assert browser.current_url == url

def test_SignUpAccountName_validFullName(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.NAME, "Full name").send_keys("Valid Full Name")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(10)
    assert browser.current_url == nextPage
'''
