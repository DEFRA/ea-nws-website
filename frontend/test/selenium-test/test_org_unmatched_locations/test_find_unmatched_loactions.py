import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/organisation/unmatchedlocations/find"
nextPage = "http://localhost:3000"

def test__empty_input(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Select if you want to manually find, or not add, locations" in browser.page_source
    assert browser.current_url == url




