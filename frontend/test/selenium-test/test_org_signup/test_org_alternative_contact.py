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
    enter_input_text(get_browser, 'govuk-text-input email-address', 'sa', 'id')
    click_button(get_browser, 'Continue', url)
    assert "Enter an email address in the correct format, like name@example.com" in browser.page_source

def test__invalid_input_telephone(get_browser):
    browser = setup_session(get_browser)
    browser.get(url)
    enter_input_text(get_browser, 'govuk-text-input telephone-number', 'sa', 'id')
    click_button(get_browser, 'Continue', url)
    assert "Enter a UK landline or mobile telephone number, like 01632 960 001 or 07700 900 982" in browser.page_source

def test__valid_input(get_browser):
    browser = setup_session(get_browser)
    browser.get(url)

    enter_input_text(get_browser, 'govuk-text-input full-name', 'Cammy', 'id')
    enter_input_text(get_browser, 'govuk-text-input email-address', 'for@gmail.com', 'id')
    enter_input_text(get_browser, 'govuk-text-input telephone-number', '07889668396', 'id')

    click_button(get_browser, 'Continue', nextUrl)
