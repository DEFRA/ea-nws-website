import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time

index = "http://localhost:3000/index"
url = "http://localhost:3000/managecontacts/add-mobile"
previousPage = "http://localhost:3000/managecontacts"
nextPage = "http://localhost:3000/managecontacts/validate-mobile"

def setup_addmobile_test(get_browser):
    browser = get_browser
    browser.get(index)
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    browser.find_element(By.LINK_TEXT, "Manage Contacts page").click()
    time.sleep(1)
    button_xpath = f"//button[text()='Add a mobile telephone number']"
    add_mobile_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", add_mobile_link)
    return browser

def test_addmobilestart_render(get_browser):
    browser = setup_addmobile_test(get_browser) 
    assert browser.current_url == url
    assert "Enter a mobile number to get flood messages by text" in browser.page_source

def test_addmobilestart_backButton(get_browser):
    browser = setup_addmobile_test(get_browser)     
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == previousPage

def test_addmobilestart_emptynumber(get_browser):
    browser = setup_addmobile_test(get_browser)   
    browser.find_element(By.NAME, "UK mobile telephone number").send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter a UK mobile telephone number" in browser.page_source
    assert browser.current_url == url

def test_addmobilestart_incorrectnumber(get_browser):
    browser = setup_addmobile_test(get_browser)   
    browser.find_element(By.NAME, "UK mobile telephone number").send_keys("0700")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter a valid UK mobile telephone number" in browser.page_source
    assert browser.current_url == url

def test_addlandlinestart_duplicateNumber(get_browser):
    browser = setup_addmobile_test(get_browser)   
    browser.find_element(By.NAME, "UK mobile telephone number").send_keys("07000000000")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "You have already registered this mobile number on your account - you cannot enter it again" in browser.page_source
    assert browser.current_url == url

def test_addmobilestart_validNumber(get_browser):
    browser = setup_addmobile_test(get_browser)  
    browser.find_element(By.NAME, "UK mobile telephone number").send_keys("07700000000")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == nextPage


