import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

previous_url= url_org_man_loc.get('optionalLocation').get('addActionPlan')
current_url  = url_org_man_loc.get('optionalLocation').get('addNotes')
url_next_page = url_org_man_loc.get('add').get('predefinedBoundary').get('addAnother')
#url_next_page = local_host + '/' # TODO update when next page implemented

max_chars = 500
text_too_long = 'a' * (max_chars + 1)
text_just_right = 'b' * max_chars
text_under_req  = 'c' * (max_chars - 1)

def test_render(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    assert 'Notes (optional)' in get_browser.page_source
    assert 'Any notes that may be helpful to someone not familiar with this location.' in get_browser.page_source
    assert 'You can enter up to 500 characters' in get_browser.page_source

def test_back_button(get_browser):
    navigate_to_auth_page_via_index(get_browser,previous_url)
    click_button(get_browser, 'Continue', current_url)
    click_link(get_browser, "Back", previous_url)

def test_continue_empty(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    click_button(get_browser, 'Continue', url_next_page)

def test_continue_filled_text_length_just_right(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    enter_textarea_text(get_browser, 'govuk-textarea', text_just_right, 'id')
    click_button(get_browser, 'Continue', url_next_page)

def test_continue_filled_text_length_too_long_failure(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    enter_textarea_text(get_browser, 'govuk-textarea', text_too_long, 'id')
    click_button(get_browser, 'Continue', current_url)

def test_continue_filled_text_length_under_req(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    enter_textarea_text(get_browser, 'govuk-textarea', text_under_req, 'id')
    click_button(get_browser, 'Continue', url_next_page)