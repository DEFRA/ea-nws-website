import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time

index = "http://localhost:3000/index"
current_url = "http://localhost:3000/managecontacts/validate-landline" 
previous_page = "http://localhost:3000/managecontacts/add-landline"
next_page = "http://localhost:3000/managecontacts"

def setup_validatelandline_test(get_browser):
    browser = get_browser
    browser.get(index)
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    browser.find_element(By.LINK_TEXT, "Manage Contacts page").click()
    time.sleep(1)
    button_xpath = f"//button[text()='Add a telephone number']"
    add_mobile_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", add_mobile_link)
    time.sleep(1)
    browser.find_element(By.NAME, "UK landline or mobile telephone number").send_keys("01632960001")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    return browser

def test_addlandlinevalidate_render(get_browser):
    browser = setup_validatelandline_test(get_browser) 
    assert browser.current_url == current_url
    assert "Confirm telephone number" in browser.page_source

def test_addlandlinevalidate_backButton(get_browser):
    browser = setup_validatelandline_test(get_browser)   
    assert browser.current_url == current_url  
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == previous_page

def test_addlandlinevalidate_emptycode(get_browser):
    browser = setup_validatelandline_test(get_browser)   
    browser.find_element(By.NAME, "Enter code").send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert "Enter code" in browser.page_source
    assert browser.current_url == current_url

def test_addlandlinevalidate_tooshortcode(get_browser):
    browser = setup_validatelandline_test(get_browser)   
    browser.find_element(By.NAME, "Enter code").send_keys("1234")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert "Code must be 6 numbers" in browser.page_source
    assert browser.current_url == current_url

def test_addlandlinevalidate_validCode(get_browser):
    browser = setup_validatelandline_test(get_browser)  
    browser.find_element(By.NAME, "Enter code").send_keys("123456")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == next_page

def test_addlandlinevalidate_skipandconfirmlater(get_browser):
    browser = setup_validatelandline_test(get_browser)  
    browser.find_element(By.LINK_TEXT, "Skip and confirm later").click()
    time.sleep(1)
    assert browser.current_url == next_page

def test_addlandlinevalidate_resendCode(get_browser):
    browser = setup_validatelandline_test(get_browser)  
    browser.find_element(By.LINK_TEXT, "Get a new code").click()
    time.sleep(1)
    assert browser.current_url == current_url

def test_addlandlinevalidate_enteradifferentnumber(get_browser):
    browser = setup_validatelandline_test(get_browser)  
    browser.find_element(By.LINK_TEXT, "Enter a different telephone number").click()
    time.sleep(1)
    assert browser.current_url == previous_page

def test_addlandlinevalidate_enteradifferentLandline_correctLandline(get_browser):
    browser = setup_validatelandline_test(get_browser)  
    assert "+441632960001" in browser.page_source
    browser.find_element(By.LINK_TEXT, "Enter a different telephone number").click()
    time.sleep(1)
    assert browser.current_url == previous_page
    browser.find_element(By.NAME, "UK landline or mobile telephone number").send_keys("01410000000")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == current_url
    assert "+441410000000" in browser.page_source
