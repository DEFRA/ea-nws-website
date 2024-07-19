import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

index_page = "http://localhost:3000/index"
home_page = "http://localhost:3000/home"
review_page = "http://localhost:3000/signup/review"
addcontact_page = "http://localhost:3000/signup/review/addcontact"

def check_exists_by_xpath(browser, xpath):
    try:
        browser.find_element(By.XPATH, xpath)
    except NoSuchElementException:
        return False
    return True

def setup_reviewpage_test(get_browser):
    browser = get_browser
    browser.get(index_page)
    button_xpath = f"//button[text()='Activate/Deactivate Mock Session 1']"
    mock_session_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_session_link)
    link_xpath = f"//a[text()='Sign up review']"
    link_link = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_link)
    time.sleep(1)
    return browser

def test_reviewpage_render(get_browser):
    browser = setup_reviewpage_test(get_browser)
    assert browser.current_url == review_page
    assert "Check your answers" in browser.page_source
    assert "Location you selected" in browser.page_source
    assert "Flood messages you'll get" in browser.page_source
    assert "How you'll get flood messages" in browser.page_source
    assert "Your Account" in browser.page_source

def test_reviewpage_change_location(get_browser):
    browser = setup_reviewpage_test(get_browser)
    assert browser.current_url == review_page

def test_reviewpage_addcontact_location(get_browser):
    browser = setup_reviewpage_test(get_browser)
    button_xpath = f"//button[text()='Add another email or phone number']"
    add_contact_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", add_contact_link)
    assert browser.current_url == addcontact_page

def test_reviewpage_addcontact_location(get_browser):
    browser = setup_reviewpage_test(get_browser)
    button_xpath = f"//button[text()='Add another email or phone number']"
    add_contact_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", add_contact_link)
    assert browser.current_url == addcontact_page
    


'''
def test_SignUpValidate_render(get_browser):
    browser = get_browser
    browser.get(previous_url)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert "Check your email" in browser.page_source
    assert browser.current_url == url

def test_SignUpValidate_backButton(get_browser):
    browser = get_browser
    browser.get(previous_url)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == previous_url

def test_SignUpValidate_emptyCode(get_browser):
    browser = get_browser
    browser.get(previous_url)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.find_element(By.NAME, 'Enter code').send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter code" in browser.page_source
    assert browser.current_url == url

def test_SignUpValidate_incorrectFormatCode(get_browser):
    browser = get_browser
    browser.get(previous_url)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.find_element(By.NAME, 'Enter code').send_keys("342")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Code must be 6 numbers" in browser.page_source
    assert browser.current_url == url

def test_SignUpValidate_invalidCode(get_browser):
    browser = get_browser
    browser.get(previous_url)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.find_element(By.NAME, 'Enter code').send_keys("999999")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert "Invalid Code" in browser.page_source
    assert browser.current_url == url

def test_SignUpValidate_validCode(get_browser):
    browser = get_browser
    browser.get(previous_url)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.find_element(By.NAME, 'Enter code').send_keys("123456")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == end_page

def test_SignUpValidate_emailAppears(get_browser):
    browser = get_browser
    browser.get(previous_url)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == url
    assert "valid@email.uk" in browser.page_source
'''