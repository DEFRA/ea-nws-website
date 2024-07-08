import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

index = "http://localhost:3000/index"
previousPage = "http://localhost:3000/managecontacts/add-email"
currenturl = "http://localhost:3000/managecontacts/validate-email"
manageContact_url = "http://localhost:3000/managecontacts"

def setup_validateemail_test(get_browser):
    browser = get_browser
    browser.get(index)
    button_xpath = f"//button[text()='Activate/Deactivate Mock Session 1']"
    mock_session_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_session_link)
    link_xpath = f"//a[text()='Manage Contacts page']"
    link_link = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_link)
    time.sleep(1)
    button_xpath = f"//button[text()='Add a email address']"
    add_email_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", add_email_link)
    time.sleep(1)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    return browser

def test_addemailvalidate_render(get_browser):
    browser = setup_validateemail_test(get_browser) 
    assert browser.current_url == currenturl
    assert "Check your email" in browser.page_source

def test_addemailvalidate_backButton(get_browser):
    browser = setup_validateemail_test(get_browser)     
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == previousPage

def test_addemailvalidate_emptyCode(get_browser):
    browser = setup_validateemail_test(get_browser)   
    browser.find_element(By.NAME, "Enter code").send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert "Enter code" in browser.page_source
    assert browser.current_url == currenturl

def test_addemailvalidate_tooshortcode(get_browser):
    browser = setup_validateemail_test(get_browser)   
    browser.find_element(By.NAME, "Enter code").send_keys("1234")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert "Code must be 6 numbers" in browser.page_source
    assert browser.current_url == currenturl

def test_addemailvalidate_validCode(get_browser):
    browser = setup_validateemail_test(get_browser)  
    browser.find_element(By.NAME, "Enter code").send_keys("123456")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == manageContact_url

def test_addemailvalidate_skipandconfirmlater(get_browser):
    browser = setup_validateemail_test(get_browser)  
    browser.find_element(By.LINK_TEXT, "Skip and confirm later").click()
    time.sleep(1)
    assert browser.current_url == manageContact_url

def test_addemailvalidate_resendCode(get_browser):
    browser = setup_validateemail_test(get_browser)  
    browser.find_element(By.LINK_TEXT, "Get a new code").click()
    time.sleep(1)
    assert browser.current_url == currenturl

def test_addemailvalidate_enteradifferentemail(get_browser):
    browser = setup_validateemail_test(get_browser)  
    browser.find_element(By.LINK_TEXT, "Enter a different email").click()
    time.sleep(1)
    assert browser.current_url == previousPage

def test_addemailvalidate_enteradifferentemail_correctEmail(get_browser):
    browser = setup_validateemail_test(get_browser)  
    assert "valid@email.uk" in browser.page_source
    browser.find_element(By.LINK_TEXT, "Enter a different email").click()
    time.sleep(1)
    assert browser.current_url == previousPage
    browser.find_element(By.NAME, "Email address").send_keys("updated@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == currenturl
    assert "updated@email.uk" in browser.page_source


