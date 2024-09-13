import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

previous_url = url_org_man_loc.get('unmatched_location').get('manually_find_locations')
current_url = url_org_man_loc.get('unmatched_location').get('select_how')
find_by_address = url_org_man_loc.get('unmatched_location').get('find_by_address')
find_by_map = local_host + '/'

def test_render(get_browser):
    navigate_to_auth_page_via_index(get_browser, current_url)
    assert 'How do you want to find this location?' in get_browser.page_source
    assert 'Select from a drop-down list of partly matches addresses' in get_browser.page_source
    assert 'Find location on a map' in get_browser.page_source
    assert 'Continue' in get_browser.page_source

def test_empty_input(get_browser):
    navigate_to_auth_page_via_index(get_browser, current_url)
    click_button(get_browser, 'Continue', current_url)
    assert 'Select if you want to find this location from a drop-down list or on a map' in get_browser.page_source
    
'''
def test_back_button(get_browser):
    navigate_to_auth_page_via_index(get_browser, current_url)
    click_link(get_browser, 'Back', previous_url)
    assert 'Select if you want to find this location from a drop-down list or on a map' in get_browser.page_source
'''
def test_select_from_drop_down_continue(get_browser):
    navigate_to_auth_page_via_index(get_browser, current_url)
    select_input_radio_option(get_browser, 'Dropdown')
    click_button(get_browser, 'Continue', find_by_address)
    assert 'Select from a drop-down list of partly matches addresses' in get_browser.page_source





