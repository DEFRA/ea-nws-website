import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time

index = "http://localhost:3000/index"
current_page = "http://localhost:3000/managecontacts/add-landline"
previous_page = "http://localhost:3000/managecontacts"
next_page = "http://localhost:3000/managecontacts/validate-landline"

def setup_addlandline_test(get_browser):
    browser = get_browser
    browser.get(index)
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    browser.find_element(By.LINK_TEXT, "Manage Contacts page").click()
    time.sleep(1)
    button_xpath = f"//button[text()='Add a telephone number']"
    add_mobile_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", add_mobile_link)
    return browser

def test_addlandlinestart_render(get_browser):
    browser = setup_addlandline_test(get_browser) 
    assert browser.current_url == current_page
    assert "Enter a telephone number to get flood messages by phone call" in browser.page_source

def test_addlandlinestart_backButton(get_browser):
    browser = setup_addlandline_test(get_browser)     
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == previous_page

def test_addlandlinestart_emptynumber(get_browser):
    browser = setup_addlandline_test(get_browser)   
    browser.find_element(By.NAME, "UK landline or mobile telephone number").send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter a UK landline or mobile telephone number" in browser.page_source
    assert browser.current_url == current_page

def test_addlandlinestart_incorrectnumber(get_browser):
    browser = setup_addlandline_test(get_browser)   
    browser.find_element(By.NAME, "UK landline or mobile telephone number").send_keys("0141")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter a UK landline or mobile telephone number, like 01632 960 001 or 07700 900 982" in browser.page_source
    assert browser.current_url == current_page

def test_addlandlinestart_duplicateNumber(get_browser):
    browser = setup_addlandline_test(get_browser)   
    browser.find_element(By.NAME, "UK landline or mobile telephone number").send_keys("00000000000")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "You have already registered this number to get flood messages by phone call" in browser.page_source
    assert browser.current_url == current_page

def test_addlandlinestart_validNumber(get_browser):
    browser = setup_addlandline_test(get_browser)  
    browser.find_element(By.NAME, "UK landline or mobile telephone number").send_keys("01632960001")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == next_page


