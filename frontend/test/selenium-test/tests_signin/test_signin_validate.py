import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

url = "http://localhost:3000/signin/validate"
previous_url = "http://localhost:3000/signin"
start_page = "http://localhost:3000/"

def test_SignInValidate_render(get_browser):
    browser = get_browser
    browser.get(previous_url)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.title == "React App"
    assert "Check your email" in browser.page_source
    assert browser.current_url == url

def test_SignInValidate_backButton(get_browser):
    browser = get_browser
    browser.get(previous_url)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url == previous_url

def test_SignInValidate_emptyCode(get_browser):
    browser = get_browser
    browser.get(previous_url)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.find_element(By.NAME, 'Enter code').send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter code" in browser.page_source
    assert browser.current_url == url

def test_SignInValidate_incorrectFormatCode(get_browser):
    browser = get_browser
    browser.get(previous_url)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.find_element(By.NAME, 'Enter code').send_keys("342")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Code must be 6 numbers" in browser.page_source
    assert browser.current_url == url

def test_SignInValidate_invalidCode(get_browser):
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

def test_SignInValidate_validCode(get_browser):
    browser = get_browser
    browser.get(previous_url)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    browser.find_element(By.NAME, 'Enter code').send_keys("123456")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == start_page

def test_SignInValidate_emailAppears(get_browser):
    browser = get_browser
    browser.get(previous_url)
    browser.find_element(By.NAME, "Email address").send_keys("valid@email.uk")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    time.sleep(1)
    assert browser.current_url == url
    assert "valid@email.uk" in browser.page_source
