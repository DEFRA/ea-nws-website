import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time

signup_url = "http://localhost:3000/signup/"
choose_number_url = "http://localhost:3000/signup/contactpreferences/landline/choosenumber"
next_url = "http://localhost:3000/signup/contactpreferences/landline/validate"
def setup_validate_test(get_browser):
    browser = get_browser
    browser.get(signup_url)
    browser.find_element(By.ID,"govuk-text-input").send_keys("valid@email.com")
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    time.sleep(1)
    browser.find_element(By.ID, "govuk-text-input").send_keys("123456")
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    time.sleep(1)
    browser.find_element(By.ID, "idText").click()
    browser.find_element(By.ID, "idPhone call").click()
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    time.sleep(1)
    browser.find_element(By.ID,"govuk-text-input").send_keys("07000000001")
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    time.sleep(1)
    browser.find_element(By.ID,"govuk-text-input").send_keys("123456")
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    time.sleep(1)
    browser.find_element(By.ID,"govuk-text-input").send_keys("+441410000001")
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    time.sleep(1)
    browser.find_element(By.LINK_TEXT, "Enter a different telephone number").click()
    time.sleep(1)
    return browser


def test_page_load(get_browser):
    browser = setup_validate_test(get_browser)
    assert browser.current_url == choose_number_url

def test_errors_render(get_browser):
    browser = setup_validate_test(get_browser)
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    assert browser.find_element(By.CLASS_NAME,"govuk-error-message").is_displayed()

def test_check_mobile_entered_is_option(get_browser):
    browser = setup_validate_test(get_browser)
    assert "+447000000001" in browser.page_source

def test_enter_new_number(get_browser):
    browser = setup_validate_test(get_browser)
    browser.find_element(By.ID,"idA different number").click()
    browser.find_element(By.ID,"govuk-text-input").send_keys("+441411111111")
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    assert browser.current_url == next_url

def test_new_number_validate_page(get_browser):
    browser = setup_validate_test(get_browser)
    browser.find_element(By.ID,"idA different number").click()
    browser.find_element(By.ID,"govuk-text-input").send_keys("+441411111111")
    browser.find_element(By.CLASS_NAME,"govuk-button").click()
    assert "+441411111111" in browser.page_source

  