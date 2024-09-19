import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

previous_url= url_org_man_loc.get('optionalLocation').get('addKeywords')
current_url  = url_org_man_loc.get('optionalLocation').get('addActionPlan')
url_next_page = url_org_man_loc.get('optionalLocation').get('addNotes')

text_too_long = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qua'
text_just_right = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu'
text_under_req = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes'

def test_render(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    assert 'Action plan (optional)' in get_browser.page_source
    assert 'What you can do to reduce the potential effects of flooding, for example, inspect the location, use sandbags, move stock, evacuate.' in get_browser.page_source
    assert 'You can enter up to 200 characters' in get_browser.page_source

def test_back_button(get_browser):
    navigate_to_auth_page_via_index(get_browser,previous_url)
    click_button(get_browser, 'Continue', current_url)
    click_link(get_browser, "Back", previous_url)

def test_continue_empty(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    click_button(get_browser, 'Continue', url_next_page)
    assert 'Notes (optional)' in get_browser.page_source

def test_continue_filled_text_length_just_right(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    enter_textarea_text(get_browser, 'actionplan', text_just_right)
    click_button(get_browser, 'Continue', url_next_page)
    assert 'Notes (optional)' in get_browser.page_source

def test_continue_filled_text_length_too_long_failure(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    enter_textarea_text(get_browser, 'actionplan', text_too_long)
    click_button(get_browser, 'Continue', current_url)
    check_error_summary(get_browser)

def test_continue_filled_text_length_under_req(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    enter_textarea_text(get_browser, 'actionplan', text_under_req)
    click_button(get_browser, 'Continue', url_next_page)
    assert 'Notes (optional)' in get_browser.page_source