import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

url = "http://localhost:3000/organisation/manage-locations/add/xy-coordinates-not-in-england"

def test__render_page(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, url)
    assert 'This location is not in England and cannot be added to this account' in browser.page_source
    assert 'use a different set of X and Y coordinates' in browser.page_source
    assert browser.current_url == url