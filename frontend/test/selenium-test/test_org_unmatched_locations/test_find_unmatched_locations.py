import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

url = "http://localhost:3000/organisation/manage-locations/unmatched-locations"
nextPage = "http://localhost:3000"

def test__empty_input(get_browser):
    navigate_to_auth_page_via_index(get_browser, url)
    get_browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert 'Select if you want to manually find, or not add, locations' in get_browser.page_source
    assert get_browser.current_url == url




