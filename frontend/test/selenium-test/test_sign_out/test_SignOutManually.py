from re import A
import pytest
from requests import get
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url_index = "http://localhost:3000/index"
def test_sign_out_renders_and_button_header(get_browser):
    url_sign_out = "http://localhost:3000/signout"
    browser = get_browser
    browser.get(url_index)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    browser.find_element(By.LINK_TEXT,"Home page").click()
    browser.find_element(By.LINK_TEXT,"Sign Out").click()
    assert browser.current_url == url_sign_out

# test the sign in button on page
# testredirection
