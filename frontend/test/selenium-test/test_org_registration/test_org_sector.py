import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/organisation/sign-up/sector"
nextPage = "http://localhost:3000/organisation/sign-up/main-admin"

def test__empty_input(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Select whether your organisation is involved in responding to public emergencies or incidents" in browser.page_source
    assert browser.current_url == url

def test_no(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.ID, "idNo").click()
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == nextPage

def test_yes(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.ID, "idYes").click()
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == nextPage