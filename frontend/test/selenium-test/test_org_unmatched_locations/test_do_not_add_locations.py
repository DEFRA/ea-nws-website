import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/organisation/manage-locations/unmatched-locations/do-not-add"

def test__render_page(get_browser):
    browser = get_browser
    browser.get(url)
    assert "Do not add locations" in browser.page_source
    assert browser.current_url == url




