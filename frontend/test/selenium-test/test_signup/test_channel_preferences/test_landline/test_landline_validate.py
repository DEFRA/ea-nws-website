import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

previous_url = "http://localhost:3000/signup/contactpreferences/landline"
url = "http://localhost:3000/signup/contactpreferences/landline/validate"
skipPage = "http://localhost:3000/signup/contactpreferences/landline/skipconfirm"
'''
TO DO - WILL WORK ONCE REACT STORE IS MOCKED
def test_landline_validate_render(mock_session):
    phone_number = "07123455567"
    browser = mock_session
    browser.get(previous_url)
    browser.find_element(By.NAME, "UK landline or mobile telephone number").send_keys(phone_number)
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(3)
    assert browser.current_url == url
    assert "We're calling this number to read out a code:" in browser.page_source
    assert phone_number in browser.page_source

def test_landline_validate_empty_code_failure(mock_session):
    browser = mock_session
    browser.get(previous_url)
    browser.find_element(By.NAME, "UK landline or mobile telephone number").send_keys("07123455567")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(3)
    assert browser.current_url == url
    browser.find_element(By.NAME, "Enter code").send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter code" in browser.page_source
    assert browser.find_element(By.CLASS_NAME, "govuk-error-summary")
    assert browser.current_url == url

def test_landline_validate_tooshort_code_failure(mock_session):
    browser = mock_session
    browser.get(previous_url)
    browser.find_element(By.NAME, "UK landline or mobile telephone number").send_keys("07123455567")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(3)
    assert browser.current_url == url
    browser.find_element(By.NAME, "Enter code").send_keys("123")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Code must be 6 numbers" in browser.page_source
    assert browser.find_element(By.CLASS_NAME, "govuk-error-summary")
    assert browser.current_url == url

def test_landline_validate_invalid_code_failure(mock_session):
    browser = mock_session
    browser.get(previous_url)
    browser.find_element(By.NAME, "UK landline or mobile telephone number").send_keys("07123455567")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(3)
    assert browser.current_url == url
    browser.find_element(By.NAME, "Enter code").send_keys("111111")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Code must be 6 numbers" in browser.page_source
    assert browser.find_element(By.CLASS_NAME, "govuk-error-summary")
    assert browser.current_url == url
'''    


