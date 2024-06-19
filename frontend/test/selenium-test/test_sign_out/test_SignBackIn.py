from re import A
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/sign-back-in"
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
    target_url = "http://localhost:3000/signin"
    assert browser.current_url == target_url




def test_restricted_redirected_signOutManually(get_browser):
    browser = get_browser
    browser.get("http://localhost:3000/signout")
    assert "You need to sign back in to view this page" in browser.page_source 