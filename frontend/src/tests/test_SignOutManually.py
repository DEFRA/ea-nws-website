from re import A
import pytest
from requests import get
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/SignOutManually"
def test_signOutManually_render(get_browser):
    browser = get_browser
    browser.get(url)
    assert browser.title == "React App"
    assert "You've signed out" in browser.page_source
    assert browser.current_url == url


def test_signOutManually_button(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    assert browser.current_url == "http://localhost:3000/SignInPage"