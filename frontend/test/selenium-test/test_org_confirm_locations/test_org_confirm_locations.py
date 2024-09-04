import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

url = "http://localhost:3000/organisation/manage-locations/confirm"

def test__render_page(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, url)
    assert "Why do some locations not match?" in browser.page_source
    assert browser.current_url == url




