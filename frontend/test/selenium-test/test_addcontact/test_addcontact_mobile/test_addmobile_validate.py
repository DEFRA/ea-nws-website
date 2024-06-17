import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time

index = "http://localhost:3000/index"
current_url = "http://localhost:3000/managecontacts/validate-mobile" 
previous_page = "http://localhost:3000/managecontacts/add-mobile"
next_page = "http://localhost:3000/managecontacts"

def setup_validatemobile_test(get_browser):
    browser = get_browser
    browser.get(index)
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    browser.find_element(By.LINK_TEXT, "Manage Contacts page").click()
    time.sleep(1)
    button_xpath = f"//button[text()='Add a mobile telephone number']"
    add_mobile_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", add_mobile_link)
    time.sleep(1)
    browser.find_element(By.NAME, "UK mobile telephone number").send_keys("07000000000")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    return browser

def test_addmobilevalidate_render(get_browser):
    browser = setup_validatemobile_test(get_browser) 
    assert browser.current_url == current_url
    assert "Check your mobile" in browser.page_source

def test_addmobilevalidate_backButton(get_browser):
    browser = setup_validatemobile_test(get_browser)   
    assert browser.current_url == current_url  
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == previous_page

def test_addmobilevalidate_emptycode(get_browser):
    browser = setup_validatemobile_test(get_browser)   
    browser.find_element(By.NAME, "Enter code").send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert "Enter code" in browser.page_source
    assert browser.current_url == current_url

def test_addmobilevalidate_tooshortcode(get_browser):
    browser = setup_validatemobile_test(get_browser)   
    browser.find_element(By.NAME, "Enter code").send_keys("1234")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert "Code must be 6 numbers" in browser.page_source
    assert browser.current_url == current_url

def test_addmobilevalidate_validCode(get_browser):
    browser = setup_validatemobile_test(get_browser)  
    browser.find_element(By.NAME, "Enter code").send_keys("123456")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == next_page

def test_addmobilevalidate_skipandconfirmlater(get_browser):
    browser = setup_validatemobile_test(get_browser)  
    browser.find_element(By.LINK_TEXT, "Skip and confirm later").click()
    time.sleep(1)
    assert browser.current_url == next_page

def test_addmobilevalidate_resendCode(get_browser):
    browser = setup_validatemobile_test(get_browser)  
    browser.find_element(By.LINK_TEXT, "Get a new code").click()
    time.sleep(1)
    assert browser.current_url == current_url

def test_addmobilevalidate_enteradifferentmobile(get_browser):
    browser = setup_validatemobile_test(get_browser)  
    browser.find_element(By.LINK_TEXT, "Enter a different mobile").click()
    time.sleep(1)
    assert browser.current_url == previous_page

def test_addMobilevalidate_enteradifferentMobile_correctMobile(get_browser):
    browser = setup_validatemobile_test(get_browser)  
    assert "07000000000" in browser.page_source
    browser.find_element(By.LINK_TEXT, "Enter a different mobile").click()
    time.sleep(1)
    assert browser.current_url == previous_page
    browser.find_element(By.NAME, "UK mobile telephone number").send_keys("07111111111")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == current_url
    assert "07111111111" in browser.page_source


