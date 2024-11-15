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
    enter_textarea_text(get_browser, 'govuk-textarea', '8 Elliot Street', 'id')
    click_button(get_browser, "Continue", url_next_page )
    assert get_browser.current_url == url_next_page
    assert "Key information" in get_browser.page_source

def test_proceed_with_no_optional_info(get_browser):
    setup(get_browser)
    click_button(get_browser, "Continue", url_next_page )
    assert get_browser.current_url == url_next_page
    assert "Key information" in get_browser.page_source

def test_continue_button(get_browser):
    setup(get_browser)
    click_button(get_browser, 'Continue', url_next_page)
    assert "Key information" in get_browser.page_source
