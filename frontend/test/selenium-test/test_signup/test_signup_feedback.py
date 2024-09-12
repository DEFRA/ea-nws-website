import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/signup/feedback"
nextPage = "http://localhost:3000/signup/feedback/confirmation"
previousPage = "http://localhost:3000/signup"
index = "http://localhost:3000/index"

def setup_empty_profile(get_browser):
    browser = get_browser
    browser.get(index)
    button_xpath = f"//button[text()='Activate/Deactivate Empty profile - Used for sign up tests']"
    mock_empty_profile_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_empty_profile_link)
    browser.get(url)
    time.sleep(3)
    return browser

def test_FeedbackStart_render(get_browser):
    browser = setup_empty_profile(get_browser) 
    assert "Give feedback about signing up" in browser.page_source
    assert browser.current_url == url

def setup_addFeedback_empty_test(get_browser):
    browser = setup_empty_profile(get_browser) 
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    continue_button = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    return browser

def test_addFeedback_empty(get_browser):
    browser = setup_addFeedback_empty_test(get_browser)     
    assert browser.current_url == url
    assert 'Select an answer to tell us how you feel about this service' in browser.page_source


def test_addFeedback_NoCheckboxSelected(get_browser):
    browser = setup_empty_profile(get_browser) 
    browser.find_element(By.CLASS_NAME, "govuk-textarea").send_keys("test")
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    continue_button = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    assert browser.current_url == url
    assert "Select an answer to tell us how you feel about this service" in browser.page_source

def test_addFeedback_NoTextEntered(get_browser):
    browser = setup_empty_profile(get_browser) 
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-radios__input").click()
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    continue_button = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    assert browser.current_url == url
    assert "Tell us anything you like or do not like about this service" in browser.page_source

def test_addFeedback_CharacterLimitExceeded(get_browser):
    browser = setup_empty_profile(get_browser) 
    browser.find_element(By.CLASS_NAME, "govuk-radios__input").click()
    time.sleep(1)
    sampleFeedback = "A" * 2001
    text_area = browser.find_element(By.CLASS_NAME, "govuk-textarea")
    text_area.send_keys(sampleFeedback)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    continue_button = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(2)
    assert browser.current_url == url
    assert "Your answer must be 2000 characters or fewer" in browser.page_source

def test_addFeedback_Valid(get_browser):
    browser = setup_empty_profile(get_browser) 
    browser.find_element(By.CLASS_NAME, "govuk-radios__input").click()
    browser.find_element(By.CLASS_NAME, "govuk-textarea").send_keys("test")
    time.sleep(3)
    button_xpath = f"//button[contains(@class, 'govuk-button')]"
    continue_button = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", continue_button)
    time.sleep(2)
    assert browser.current_url == nextPage





