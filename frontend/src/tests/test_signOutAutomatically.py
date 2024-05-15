from re import A
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By

url = "http://localhost:3000/SignOutAutomatically"
def test_signOutAutomatically_render(get_browser):
    browser = get_browser
    browser.get(url)
    assert browser.title == "React App"
    assert "You've been signed out for security reasons" in browser.page_source
    assert browser.current_url == url


def test_signOutAutomatically_button(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    assert browser.current_url == "http://localhost:3000/SignInPage"