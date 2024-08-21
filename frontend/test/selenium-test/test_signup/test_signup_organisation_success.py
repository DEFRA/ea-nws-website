import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/organisation/signup/success"
previousPage = "http://localhost:3000/organisation/signup/review"
url_to_feedback = "http://localhost:3000/signup/feedback"

def setup_empty_profile(get_browser):
    browser = get_browser
    browser.get(index)
    button_xpath = f"//button[text()='Activate/Deactivate Empty profile - Used for sign up tests']"
    mock_empty_profile_link = browser.find_element(By.XPATH, button_xpath)
    browser.execute_script("arguments[0].click();", mock_empty_profile_link)
    time.sleep(3)
    return browser

def test_SuccessPage_render(get_browser):
    browser = setup_empty_profile(get_browser) 
    assert "Organisation details submitted for approval" in browser.page_source
    assert browser.current_url == url

def test_SuccessPage_Valid_SelectLink(get_browser):
    browser = setup_empty_profile(get_browser) 
    browser.find_element(By.CLASS_NAME, "govuk-link").click()
    time.sleep(3)
    assert browser.current_url == url_to_feedback

def test_SuccessPage_renderBody(get_browser):
    browser = setup_empty_profile(get_browser) 
    assert "Once approved, we will email you and explain how the service can be accessed." in browser.page_source
    assert browser.current_url == url

