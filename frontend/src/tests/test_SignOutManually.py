from re import A
import pytest
from requests import get
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# have top var uncommented and bottom commented in app.js
url2 = "http://localhost:3000/signoutmanually"
url1 = "http://localhost:3000/signin"
def test_signOutManually_render(get_browser):
    browser = get_browser
    browser.get(url1)
    browser.find_element(By.ID, "emailAddress").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.find_element(By.ID, 'code').send_keys("123456")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.get(url2)
    assert browser.title == "React App"
    assert "You've signed out" in browser.page_source
    assert browser.current_url == url2


def test_signOutManually_button(get_browser):
    browser = get_browser
    browser.get(url1)
    browser.find_element(By.ID, "emailAddress").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.find_element(By.ID, 'code').send_keys("123456")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.get(url2)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    assert browser.current_url == "http://localhost:3000/signinpage"