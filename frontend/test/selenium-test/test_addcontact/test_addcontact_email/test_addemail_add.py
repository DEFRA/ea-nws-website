import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

index = "http://localhost:3000/index"
url = "http://localhost:3000/managecontacts/add-email"
previousPage = "http://localhost:3000/managecontacts"
nextPage = "http://localhost:3000/managecontacts/validate-email"

def setup_addemail_test(get_browser):
    browser = get_browser
    browser.get(index)
    button_xpath = f"//button[text()='Activate/Deactivate Mock Session 1']"
    mock_session_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_session_link)
    link_xpath = f"//a[text()='Manage Contacts page']"
    link_link = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_link)
    time.sleep(3)
    button_xpath = f"//button[text()='Add an email address']"
    add_email_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", add_email_link)
    return browser

def test_addemailstart_render(get_browser):
    browser = setup_addemail_test(get_browser) 
    assert browser.current_url == url
    assert "Enter an email address to get flood messages" in browser.page_source


def test_addemailstart_backButton(get_browser):
    browser = setup_addemail_test(get_browser)     
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == previousPage

def test_addemailstart_emptyEmail(get_browser):
    browser = setup_addemail_test(get_browser)   
    browser.find_element(By.NAME, "Email address").send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter your email address" in browser.page_source
    assert browser.current_url == url

def test_addemailstart_incorrectFormatEmail(get_browser):
    browser = setup_addemail_test(get_browser)   
    browser.find_element(By.NAME, "Email address").send_keys("invalid@.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter an email address in the correct format, like name@example.com" in browser.page_source
    assert browser.current_url == url

def test_addemailstart_duplicateEmail(get_browser):
    browser = setup_addemail_test(get_browser)   
    browser.find_element(By.NAME, "Email address").send_keys("duplicate@email.com")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "You have already registered this email address on your account - you cannot enter it again" in browser.page_source
    assert browser.current_url == url

def test_addemailstart_validEmail(get_browser):
    browser = setup_addemail_test(get_browser)  
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(3)
    assert browser.current_url == nextPage


