import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

previous_url = url_org_man_loc.get('unmatched_location').get('select_how')
current_url = url_org_man_loc.get('unmatched_location').get('find_by_address')
next_url = url_org_man_loc.get('add').get('options')

def test_setup(get_browser):
    navigate_to_auth_page_via_index(get_browser, previous_url)
    select_input_radio_option(get_browser, 'Dropdown')
    click_button(get_browser, 'Continue', current_url)

def test_render(get_browser):
    test_setup(get_browser)
    assert 'Select from a drop-down list of partly matched addresses' in get_browser.page_source
    assert 'Select an address' in get_browser.page_source
    assert 'Continue' in get_browser.page_source

def test_empty_input(get_browser):
    test_setup(get_browser)
    click_button(get_browser, 'Continue', current_url)
    assert 'Select an address' in get_browser.page_source
    
def test_back_button(get_browser):
    test_setup(get_browser)
    click_link(get_browser, 'Back', previous_url)
    assert 'How do you want to find this location?' in get_browser.page_source

def test_select_from_drop_down_continue(get_browser):
    test_setup(get_browser)
    select_dropdown_option(get_browser, 'availableAddressesDropDown', '25a, Belgrave Road, London, E13 8RT')
    click_button(get_browser, 'Continue', next_url)






