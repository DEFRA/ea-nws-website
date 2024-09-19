import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

previous_url= url_org_man_loc.get('optionalLocation').get('addKeyInformation')
current_url  = url_org_man_loc.get('optionalLocation').get('addKeywords')
url_next_page = url_org_man_loc.get('optionalLocation').get('addActionPlan')

def test_render(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    assert 'Keywords for this location (optional)' in get_browser.page_source
    assert 'You can add new keywords. Or you can remove existing keywords associated with this location by unticking the relevant box.' in get_browser.page_source
    assert 'Why add keywords?' in get_browser.page_source
    click_span(get_browser, 'Why add keywords?')
    assert 'Adding keywords for each location can make it easier for you to filter and create lists of locations you can then link to the people responsible for them (contacts). ' in get_browser.page_source
    click_button(get_browser, 'Add keyword', current_url)

def test_back_button(get_browser):
    navigate_to_auth_page_via_index(get_browser,previous_url)
    click_button(get_browser, 'Continue', current_url)
    click_link(get_browser, "Back", previous_url)

def test_continue_empty(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    click_button(get_browser, 'Continue', url_next_page)
    assert 'Action plan (optional)' in get_browser.page_source

def test_continue_filled(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    enter_input_text(get_browser, 'keywords', 'keyword1, keyword4')
    click_button(get_browser, 'Continue', url_next_page)
    assert 'Action plan (optional)' in get_browser.page_source