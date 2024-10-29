import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

previous_url= url_org_man_loc.get('optionalLocation').get('addActionPlan')
current_url  = url_org_man_loc.get('optionalLocation').get('addNotes')
url_next_page = local_host + '/' # TODO update when next page implemented

text_too_long = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus'
text_just_right = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu'
text_under_req = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes'

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