import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/organisation/confirm/locations"

def test__render_page(get_browser):
    browser = get_browser
    browser.get(url)
    assert "Why do some locations not match?" in browser.page_source
    assert browser.current_url == url




