import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/organisation/register/number"
nextPage = "http://localhost:3000/organisation/register/sector"

def test__empty_input(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Select whether your organisation has a Companies House number or not" in browser.page_source
    assert browser.current_url == url

def test_no(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.ID, "idNo").click()
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == nextPage

def test_yes_with_no_number(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.ID, "idYes").click()
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert "Enter your Companies House number" in browser.page_source
    assert browser.current_url == url

def test_yes_with_number(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.ID, "idYes").click()
    input_field = browser.find_element(By.NAME, "Companies House number")
    input_field.send_keys("00000000")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == nextPage
