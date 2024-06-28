import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/signup/accountname/add"
nextPage = "http://localhost:3000/declaration"
previousPage = "http://localhost:3000"

def test_SignUpAccountName_render(get_browser):
    browser = get_browser
    browser.get(url)
    assert "Enter your name" in browser.page_source
    assert "We'll use this if we need to contact you about your account." in browser.page_source
    assert browser.current_url == url

'''
TODO Add a test for previous url
currently the previous url can be any of the contact preference selected
'''

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

def test_SignUpAccountName_validFullName(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.NAME, "Full name").send_keys("Valid Full Name")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == nextPage



