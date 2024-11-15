import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

url = url_org_signup.get('success')

def go_to_success_page(get_browser):
    browser = get_browser
    browser.get(url)
    time.sleep(1)
    return browser

def test_SuccessPage_render(get_browser):
    browser = go_to_success_page(get_browser)
    assert "Organisation details submitted for approval" in browser.page_source
    assert browser.current_url == url

def test_SuccessPage_renderBody(get_browser):
    browser = go_to_success_page(get_browser)
    assert "Once approved, we will email you and explain how the service can be accessed." in browser.page_source
    assert browser.current_url == url

