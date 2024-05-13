import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By

url = "http://localhost:3000/CheckYourEmailPage"

def test_SignInValidate_render(get_browser):
    browser = get_browser
    browser.get(url)
    assert browser.title == "React App"
    assert "Check your email" in browser.page_source
    browser.close()

def test_SignInValidate_backButton(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.CLASS_NAME, "govuk-back-link").click()
    assert browser.current_url("http://localhost:3000/SignInPage")
    browser.close()

def test_SignInValidate_emptyCode(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.ID, "code").send_keys("")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Enter code" in browser.page_source
    browser.close()

def test_SignInValidate_incorrectFormatCode(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.ID, "code").send_keys("342")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Code must be 6 numbers" in browser.page_source
    browser.close()

#Not working because cannot get the API/Backend to run, need to checkmore

def test_SignInValidate_invalidCode(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.ID, "code").send_keys("999999")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert "Invalid code" in browser.page_source
    browser.close()

def test_SignInValidate_validCode(get_browser):
    browser = get_browser
    browser.get(url)
    browser.find_element(By.ID, "code").send_keys("123456")
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert browser.current_url("http://localhost:3000/Start")
    browser.close()