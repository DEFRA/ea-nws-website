from re import A
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
# to test this file have the test var in app.js commented out and non test var commented

url = "http://localhost:3000/SignBackIn"
def test_signBackIn_render(get_browser):
    browser = get_browser
    browser.get(url)
    assert browser.title == "React App"
    assert "You need to sign back in to view this page" in browser.page_source
    assert browser.current_url == url


def test_signBackIn_SignIn_button(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    assert browser.current_url == "http://localhost:3000/SignInPage"


def test_restricted_redirected_signOutAutomatically(get_browser):
    browser = get_browser
    browser.get("http://localhost:3000/SignOutAutomatically")
    assert "You need to sign back in to view this page" in browser.page_source


def test_restricted_redirected_signOutManually(get_browser):
    browser = get_browser
    browser.get("http://localhost:3000/SignOutManually")
    assert "You need to sign back in to view this page" in browser.page_source 