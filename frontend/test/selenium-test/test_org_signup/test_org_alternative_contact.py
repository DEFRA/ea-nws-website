import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

url = "http://localhost:3000/organisation/sign-up/alternative-contact"
nextUrl = "http://localhost:3000/"

def setup_session(get_browser):
    setup_empty_profile_for_signup_flow(get_browser)
    return get_browser

def test__empty_input(get_browser):
    browser = setup_session(get_browser)
    browser.get(url)
    click_button(get_browser, 'Continue', url)
    assert "Enter your full name" in browser.page_source
    assert "Enter your email address" in browser.page_source
    assert "Enter a UK landline or mobile telephone" in browser.page_source

def test__invalid_input_email(get_browser):
    browser = setup_session(get_browser)
    browser.get(url)
    email_xpath = f"//*[@id='govuk-text-input']"
    input_element = browser.find_element(By.XPATH, email_xpath)
    input_element.send_keys("sa")
    click_button(get_browser, 'Continue', url)
    assert "Enter an email address in the correct format, like name@example.com" in browser.page_source

def test__invalid_input_telephone(get_browser):
    browser = setup_session(get_browser)
    browser.get(url)
    email_xpath = f"//*[@id='govuk-text-input']"
    input_element = browser.find_element(By.XPATH, email_xpath)
    input_element.send_keys("sa")
    click_button(get_browser, 'Continue', url)
    assert "Enter a UK landline or mobile telephone number, like 01632 960 001 or 07700 900 982" in browser.page_source

def test__valid_input(get_browser):
    browser = setup_session(get_browser)
    browser.get(url)
    fullname_xpath = f"//*[@id='govuk-text-input']"
    fullname_element = browser.find_element(By.XPATH, fullname_xpath)
    fullname_element.send_keys("test@gmail.com")

    email_xpath = f"//*[@id='govuk-text-input']"
    email_element = browser.find_element(By.XPATH, email_xpath)
    email_element.send_keys("test@gmail.com")

    phone_xpath = f"//*[@id='govuk-text-input']"
    phone_element = browser.find_element(By.XPATH, phone_xpath)
    phone_element.send_keys("07889678367")

    click_button(get_browser, 'Continue', nextUrl)
