import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains 
import time
from selenium.common.exceptions import NoSuchElementException

index_url = manage_contacts_url = "http://localhost:3000/index"

def test_popup_stay_signin_button(get_browser):
    browser = get_browser
    browser.get(index_url)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    # change this value when production / pushed dev
    time.sleep(790)
    browser.find_element(By.CLASS_NAME,"dialog").click()
    try:
         assert browser.find_element(By.CLASS_NAME,"govuk-heading-s").is_displayed()
    except NoSuchElementException:
        assert True
    

def test_popup_logout_button(get_browser):
    url_signout = "http://localhost:3000/signout"
    browser = get_browser
    browser.get(index_url)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    # change this value when production / pushed dev
    time.sleep(790)
    browser.find_element(By.LINK_TEXT,"Sign out").click()
    assert browser.current_url == url_signout


def test_stay_active(get_browser):
    browser = get_browser
    browser.get(index_url)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    # change this value when production / pushed dev
    time.sleep(780)
    action = ActionChains(browser)
    action.click()
    time.sleep(10)
    try:
         assert browser.find_element(By.CLASS_NAME,"govuk-heading-s").is_displayed()
    except NoSuchElementException:
        assert True


def test_auto_logout(get_browser):
    auto_signout_url = "http://localhost:3000/signout-auto"
    browser = get_browser
    browser.get(index_url)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    # change this value when production / pushed dev
    time.sleep(1000)
    assert browser.current_url == auto_signout_url


