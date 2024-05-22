from re import A
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# to test this file have the top variable in app.js uncommented and bottom var uncommented
url2 = "http://localhost:3000/signoutautomatically"
url1 = "http://localhost:3000/signin"
def test_page_access(get_browser):
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
    assert "You've been signed out for security reasons" in browser.page_source
    assert browser.current_url == url2


def test_signOutAutomatically_button(get_browser):
    browser = get_browser
    browser.get(url1)
    browser.find_element(By.ID, "emailAddress").send_keys("valid@email.uk")
    browser.get(url2)
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.find_element(By.ID, 'code').send_keys("123456")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    assert browser.current_url == "http://localhost:3000/signin"