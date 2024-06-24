import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

auto_signout_url = "http://localhost:3000/signout-auto"
index_url = manage_contacts_url = "http://localhost:3000/index"

def test_auto_logout_page_renders(get_browser):
    browser = get_browser
    browser.get(index_url)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    # change this value when production / pushed dev
    time.sleep(8)
    assert browser.current_url == auto_signout_url


def test_auto_signout_signin_button(get_browser):
    signin_url = "http://localhost:3000/signin"
    browser = get_browser
    browser.get(index_url)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    # change this value when production / pushed dev
    time.sleep(8)
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert browser.current_url == signin_url

