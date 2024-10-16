import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

current_url = url_org_man_keywords_path

def test_render(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    assert 'Manage keywords' in get_browser.page_source
    assert 'Locations keywords' in get_browser.page_source
    assert 'Contacts keywords' in get_browser.page_source

def test_contacts_tab(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    click_link(get_browser, "Contacts keywords", current_url)
    assert 'Search for a contact keyword' in get_browser.page_source
    assert 'Associated contacts' in get_browser.page_source

def test_locations_tab(get_browser):
    navigate_to_auth_page_via_index(get_browser,current_url)
    click_link(get_browser, "Locations keywords", current_url)
    assert 'Search for a location keyword' in get_browser.page_source
    assert 'Associated locations' in get_browser.page_source

def test_edit_dialog_render_location_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Locations keywords", current_url)
    click_link_more_than_one_text(get_browser, "Change", 1, current_url)
    time.sleep(1)
    assert 'Change keyword' in get_browser.page_source
    assert 'Close' in get_browser.page_source
    assert 'Changing this keyword will change it for all the locations' in get_browser.page_source

def test_edit_close_dialog_render_location_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Locations keywords", current_url)
    click_link_more_than_one_text(get_browser, "Change", 1, current_url)
    time.sleep(1)
    assert 'Change keyword' in get_browser.page_source
    assert 'Close' in get_browser.page_source
    assert 'Changing this keyword will change it for all the locations' in get_browser.page_source
    click_span(get_browser, "×")
    time.sleep(1)
    assert 'Change keyword' not in get_browser.page_source
    assert 'Changing this keyword will change it for all the locations' not in get_browser.page_source

def test_edit_cancel_dialog_render_location_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Locations keywords", current_url)
    click_link_more_than_one_text(get_browser, "Change", 1, current_url)
    time.sleep(1)
    assert 'Change keyword' in get_browser.page_source
    assert 'Close' in get_browser.page_source
    assert 'Changing this keyword will change it for all the locations' in get_browser.page_source
    click_link(get_browser, "Cancel", current_url)
    time.sleep(1)
    assert 'Change keyword' not in get_browser.page_source
    assert 'Changing this keyword will change it for all the locations' not in get_browser.page_source

def test_edit_location_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Locations keywords", current_url)
    assert 'Location Keyword 1' in get_browser.page_source    
    click_link(get_browser, "Change", current_url)
    time.sleep(1)
    enter_input_text(get_browser, 'Keyword', 'updated_location_keyword')
    click_button(get_browser, 'Change keyword', current_url)
    time.sleep(1)
    assert 'Location Keyword 1' not in get_browser.page_source    
    assert 'updated_location_keyword' in get_browser.page_source    

def test_edit_dialog_render_contact_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Contacts keywords", current_url)
    click_link_more_than_one_text(get_browser, "Change", 1, current_url)
    time.sleep(1)
    assert 'Change keyword' in get_browser.page_source
    assert 'Close' in get_browser.page_source
    assert 'Changing this keyword will change it for all the contacts' in get_browser.page_source

def test_edit_close_dialog_render_contacts_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Contacts keywords", current_url)
    click_link_more_than_one_text(get_browser, "Change", 1, current_url)
    time.sleep(1)
    assert 'Change keyword' in get_browser.page_source
    assert 'Close' in get_browser.page_source
    assert 'Changing this keyword will change it for all the contacts' in get_browser.page_source
    click_span(get_browser, "×")
    time.sleep(1)
    assert 'Change keyword' not in get_browser.page_source
    assert 'Changing this keyword will change it for all the contacts' not in get_browser.page_source

def test_edit_cancel_dialog_render_contacts_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Contacts keywords", current_url)
    click_link_more_than_one_text(get_browser, "Change", 1, current_url)
    time.sleep(1)
    assert 'Change keyword' in get_browser.page_source
    assert 'Close' in get_browser.page_source
    assert 'Changing this keyword will change it for all the contacts' in get_browser.page_source
    click_link(get_browser, "Cancel", current_url)
    time.sleep(1)
    assert 'Change keyword' not in get_browser.page_source
    assert 'Changing this keyword will change it for all the contacts' not in get_browser.page_source

def test_edit_contact_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Contacts keywords", current_url)
    assert 'Contact Keyword 1' in get_browser.page_source    
    click_link(get_browser, "Change", current_url)
    time.sleep(1)
    enter_input_text(get_browser, 'Keyword', 'updated_contact_keyword')
    click_button(get_browser, 'Change keyword', current_url)
    time.sleep(1)
    assert 'Contact Keyword 1' not in get_browser.page_source    
    assert 'updated_contact_keyword' in get_browser.page_source    

