import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By

manage_contacts_url = "http://localhost:3000/managecontacts"
sign_back_in_url = "http://localhost:3000/sign-back-in"
def test_sign_back_in_render_redirect(get_browser):
    browser = get_browser
    browser.get(manage_contacts_url)
    assert browser.current_url == sign_back_in_url
    

def test_sign_back_in_button(get_browser):
    sign_in_url = "http://localhost:3000/signin"
    browser = get_browser
    browser.get(manage_contacts_url)
    browser.find_element(By.CLASS_NAME, "govuk-button").click()
    assert browser.current_url == sign_in_url