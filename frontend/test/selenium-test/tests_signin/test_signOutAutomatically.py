from re import A
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# these tests need re writing for the user to be signed in
url2 = "http://localhost:3000/signoutautomatically"
url1 = "http://localhost:3000/signin"
def test_page_access(get_browser):
    browser = get_browser
    browser.get(url1)
    browser.find_element(By.ID, "govuk-text-input").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.find_element(By.ID, 'govuk-text-input').send_keys("123456")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.get(url2)
    assert browser.title == "React App"
    assert "You've been signed out for security reasons" in browser.page_source
    assert browser.current_url == url2


def test_signOutAutomatically_button(get_browser):
    browser = get_browser
    browser.get(url1)
    browser.find_element(By.ID, "govuk-text-input").send_keys("valid@email.uk")
    
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(3)
    browser.find_element(By.ID, 'govuk-text-input').send_keys("123456")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(3)
    browser.get(url2)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    assert browser.current_url == "http://localhost:3000/signin"