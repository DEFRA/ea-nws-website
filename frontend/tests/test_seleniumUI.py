from re import A
import pytest
from pytest import yield_fixture
from requests import get
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

#these are Ui tests

@pytest.fixture
def get_browser():
    # path to geckodriver so you can access firefox
    geckodriver_path = "/snap/bin/geckodriver"
    driver_service = webdriver.FirefoxService(executable_path=geckodriver_path)

    browser = webdriver.Firefox(service=driver_service)

    yield browser
    browser.quit()


# these are for the sign back in page
def test_SignBackIn_page_loaded(get_browser):
    get_browser.get("http://localhost:3000/signbackin")
    if get_browser.execute_script("return document.readyState") == "complete":assert True
    

def test_button(get_browser):
    get_browser.get("http://localhost:3000/signbackin")
    get_browser.find_element(By.CLASS_NAME,'govuk-button').click()
    assert get_browser.find_element(By.CLASS_NAME,'govuk-button').is_enabled()

#tests for the signout automatically
def test_signoutautomatically_loaded(get_browser):
    get_browser.get("http://localhost:3000/signoutautomatically")
    if get_browser.execute_script("return document.readyState") == "complete":assert True

def test_button_auto_signout_page(get_browser):
    get_browser.get("http://localhost:3000/signoutautomatically")
    get_browser.find_element(By.CLASS_NAME,'govuk-button').click()
    assert get_browser.find_element(By.CLASS_NAME,'govuk-button').is_enabled()


#tests for the sign out manually page
def test_Signoutmanually_page_loaded(get_browser):
    get_browser.get("http://localhost:3000/signoutmanually")
    if get_browser.execute_script("return document.readyState") == "complete":assert True


def test_button_signoutmanually_page(get_browser):
    get_browser.get("http://localhost:3000/signoutmanually")
    get_browser.find_element(By.CLASS_NAME,'govuk-button').click()
    assert get_browser.find_element(By.CLASS_NAME,'govuk-button').is_enabled()