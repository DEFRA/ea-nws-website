import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

index_page = "http://localhost:3000/index"
home_page = "http://localhost:3000/home"
review_page = "http://localhost:3000/signup/review"
addcontact_page = "http://localhost:3000/signup/review/addcontact"
removecontact_page = "http://localhost:3000/signup/review/remove-contact"
finish_page = "http://localhost:3000/signup/success"
confirm_page = "http://localhost:3000/signup/review/validate-email"

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

def test_reviewpage_successpage(get_browser):
    browser = setup_reviewpage_test(get_browser)
    button_xpath = f"//button[text()='Finish sign up']"
    finish_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", finish_link)
    assert browser.current_url == finish_page
    
def test_reviewpage_removecontact(get_browser):
    browser = setup_reviewpage_test(get_browser)
    link_xpath = f"//a[text()='Remove']"
    remove_link = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", remove_link)
    assert browser.current_url == removecontact_page

def test_confirm_page(get_browser):
    browser = helper_add_unconfirmed_number(get_browser)
    confirm_xpath = f"//a[text()='Confirm']"
    confirm_link = browser.find_element(By.XPATH, confirm_xpath)
    browser.execute_script("arguments[0].click();", confirm_link)
    assert browser.current_url == confirm_page

#Helper
def helper_add_unconfirmed_number(get_browser):
    browser = setup_reviewpage_test(get_browser)
    button_addcontact_xpath = f"//button[text()='Add another email or phone number']"
    add_contact_link = browser.find_element(By.XPATH, button_addcontact_xpath)
    browser.execute_script("arguments[0].click();", add_contact_link)

    browser.find_element(By.CLASS_NAME, "govuk-radios__input").click()
    button_continue_xpath = f"//button[text()='Continue']"
    inputemail_page = browser.find_element(By.XPATH, button_continue_xpath)
    browser.execute_script("arguments[0].click();", inputemail_page)

    browser.find_element(By.NAME, "Email address").send_keys("test@valid.com")
    button_continuevalidation_xpath = f"//button[text()='Continue']"
    validation_link = browser.find_element(By.XPATH, button_continuevalidation_xpath)
    browser.execute_script("arguments[0].click();", validation_link)
    time.sleep(1)
    assert browser.current_url == 'http://localhost:3000/signup/review/validate-email'

    skip_xpath = f"//a[text()='Skip and confirm later']"
    skip_link = browser.find_element(By.XPATH, skip_xpath)
    browser.execute_script("arguments[0].click();", skip_link)
    time.sleep(1)
    assert browser.current_url == review_page
    assert "Unconfirmed" in browser.page_source
    return browser
    
