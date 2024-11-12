import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

previous_url= url_org_man_loc.get('optionalLocation').get('optionalAddress')
current_url  = url_org_man_loc.get('optionalLocation').get('addKeyInformation')
url_next_page = url_org_man_loc.get('optionalLocation').get('addKeywords')

def test_render(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    assert 'Key information' in get_browser.page_source
    click_span(get_browser, 'Why add useful information?')
    assert 'Providing these details will allow you to filter your organisation’s locations, making it quicker to find them.' in get_browser.page_source
    assert 'Internal reference (optional)' in get_browser.page_source
    assert 'Business criticality (optional)' in get_browser.page_source
    assert 'Location type (optional)' in get_browser.page_source

def test_back_button(get_browser):
    navigate_to_auth_page_via_index(get_browser,previous_url)
    click_button(get_browser, 'Continue', current_url)
    click_link(get_browser, "Back", previous_url)

def test_continue_empty(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    click_button(get_browser, 'Continue', url_next_page)
    assert 'Keywords for this location' in get_browser.page_source

def test_continue_filled(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    enter_input_text(get_browser, 'Internal reference (optional)', 'PS01 unit 57')
    enter_input_text(get_browser, 'Business criticality (optional)', 'Medium')
    enter_input_text(get_browser, 'Location type (optional)', 'Office')
    click_button(get_browser, 'Continue', url_next_page)
    assert 'Keywords for this location' in get_browser.page_source

def test_continue_1_field_filled(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    enter_input_text(get_browser, 'Business criticality (optional)', 'Low')
    click_button(get_browser, 'Continue', url_next_page)
    assert 'Keywords for this location' in get_browser.page_source