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
    button_xpath = f"//button[text()='Activate/Deactivate Mock Session 1']"
    mock_session_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_session_link)
    time.sleep(12)
    browser.find_element(By.CLASS_NAME,"dialog").click()
    try:
         assert browser.find_element(By.CLASS_NAME,"govuk-heading-s").is_displayed()
    except NoSuchElementException:
        assert True
    

def test_popup_logout_button(get_browser):
    url_signout = "http://localhost:3000/signout"
    browser = get_browser
    browser.get(index_url)
    button_xpath = f"//button[text()='Activate/Deactivate Mock Session 1']"
    mock_session_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_session_link)
    time.sleep(12)
    browser.find_element(By.LINK_TEXT,"Sign out").click()
    assert browser.current_url == url_signout


def test_stay_active(get_browser):
    browser = get_browser
    browser.get(index_url)
    button_xpath = f"//button[text()='Activate/Deactivate Mock Session 1']"
    mock_session_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_session_link)
    time.sleep(7)
    link_xpath = f"//a[text()='Home page']"
    link_link = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_link)
    time.sleep(5)
    try:
         browser.find_element(By.CLASS_NAME,"govuk-heading-s").is_displayed()
         assert False
    except NoSuchElementException:
        assert True



def test_auto_logout(get_browser):
    auto_signout_url = "http://localhost:3000/signout-auto"
    browser = get_browser
    browser.get(index_url)
    button_xpath = f"//button[text()='Activate/Deactivate Mock Session 1']"
    mock_session_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_session_link)
    time.sleep(16)
    assert browser.current_url == auto_signout_url

