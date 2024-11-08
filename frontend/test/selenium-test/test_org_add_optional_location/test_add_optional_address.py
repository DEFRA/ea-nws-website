import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

current_url = url_org_man_loc.get('optionalLocation').get('optionalAddress')
url_next_page = url_org_man_loc.get('optionalLocation').get('addKeyInformation')

def setup (browser):
    navigate_to_auth_page_via_index(browser,current_url)


def test_option_address_renders(get_browser):
    setup(get_browser)
    assert get_browser.current_url == current_url
    assert "What is the address?" in get_browser.page_source

def test_proceed_with_optional_info(get_browser):
    setup(get_browser)
    enter_input_text(get_browser, 'Address line 1 (optional)', '8 Elliot Street')
    click_button(get_browser, "Continue", url_next_page )
    assert get_browser.current_url == url_next_page
    assert "Key information" in get_browser.page_source

def test_proceed_with_no_optional_info(get_browser):
    setup(get_browser)
    click_button(get_browser, "Continue", url_next_page )
    assert get_browser.current_url == url_next_page
    assert "Key information" in get_browser.page_source

def test_postcode_error(get_browser):

    setup(get_browser)
    element = get_browser.find_element(By.CLASS_NAME,'govuk-textarea')
    get_browser.execute_script("arguments[0].scrollIntoView(true);",element)
    element.send_keys("kt3")
    click_button(get_browser, 'Continue', current_url)
    assert "Enter a full postcode in England, in the correct format, like KT3 3QQ" in get_browser.page_source

def test_valid_postcode(get_browser):
    setup(get_browser)
    element = get_browser.find_element(By.CLASS_NAME,'govuk-textarea')
    get_browser.execute_script("arguments[0].scrollIntoView(true);",element)
    element.send_keys("kt3 3qq")
    click_button(get_browser, 'Continue', url_next_page)

def test_continue_button(get_browser):
    setup(get_browser)
    click_button(get_browser, 'Continue', url_next_page)
    assert "Key information" in get_browser.page_source