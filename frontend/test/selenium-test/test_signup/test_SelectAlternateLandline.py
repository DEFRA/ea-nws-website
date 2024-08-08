import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time

index = "http://localhost:3000/index"
signup_url = "http://localhost:3000/signup/"
alternative_landline_url = "http://localhost:3000/signup/contactpreferences/landline/alternative-landline"
next_url = "http://localhost:3000/signup/contactpreferences/landline/validate"


def setup_validate_test(get_browser):
    browser = get_browser
    browser.get(index)
    button_xpath = f"//button[text()='Activate/Deactivate Empty profile - Used for sign up tests']"
    mock_empty_profile_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_empty_profile_link)
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
    browser.find_element(By.LINK_TEXT, "Enter a different telephone number").click()
    time.sleep(1)
    return browser

def test_page_load(get_browser):
    browser = setup_validate_test(get_browser)
    assert browser.current_url == alternative_landline_url

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
    button_xpath = f"//button[text()='Continue']"
    button_button =browser.find_element(By.XPATH,button_xpath)
    browser.execute_script("arguments[0].click();",button_button)
    time.sleep(3)
    assert browser.current_url == next_url

def test_new_number_validate_page(get_browser):
    browser = setup_validate_test(get_browser)
    browser.find_element(By.ID,"idA different number").click()
    browser.find_element(By.ID,"govuk-text-input").send_keys("+441411111111")
    button_xpath = f"//button[text()='Continue']"
    button_button =browser.find_element(By.XPATH,button_xpath)
    browser.execute_script("arguments[0].click();",button_button)
    time.sleep(3)
    assert "+441411111111" in browser.page_source

  