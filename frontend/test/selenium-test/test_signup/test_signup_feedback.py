import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/signup/feedback"
nextPage = "http://localhost:3000/signup"
previousPage = "http://localhost:3000/signup"

def test_FeedbackStart_render(get_browser):
    browser = get_browser
    browser.get(url)
    assert "Give feedback about signing up" in browser.page_source
    assert browser.current_url == url

def test_FeedbackStart_backButton(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == previousPage

def setup_addFeedback_empty_test(get_browser):
    browser = get_browser
    browser.get(url)
    time.sleep(1)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    continue_button = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    return browser

def test_addFeedback_empty(get_browser):
    browser = setup_addFeedback_empty_test(get_browser) 
    assert browser.current_url == url
    assert "Select an answer to tell us how you feel about this service" in browser.page_source
    assert "Tell us anything you like or do not like about this service" in browser.page_source

def test_addFeedback_NoCheckboxSelected(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-textarea").send_keys("test")
    time.sleep(1)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    continue_button = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    assert browser.current_url == url
    assert "Select an answer to tell us how you feel about this service" in browser.page_source

def test_addFeedback_NoTextEntered(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-radios__input").click()
    time.sleep(1)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    continue_button = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    assert browser.current_url == url
    assert "Tell us anything you like or do not like about this service" in browser.page_source

def test_addFeedback_Valid(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-radios__input").click()
    browser.find_element(By.CLASS_NAME, "govuk-textarea").send_keys("test")
    time.sleep(1)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    continue_button = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(2)
    assert browser.current_url == nextPage





