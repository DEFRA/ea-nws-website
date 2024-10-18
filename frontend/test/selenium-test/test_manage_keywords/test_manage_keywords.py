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

# EDIT LOCATION
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
    enter_input_text(get_browser, 'Keyword', 'updated_keyword')
    click_button(get_browser, 'Change keyword', current_url)
    time.sleep(1)
    assert 'Location Keyword 1' not in get_browser.page_source    
    assert 'updated_keyword' in get_browser.page_source    
    assert 'Success' in get_browser.page_source  
    assert 'Keyword edited' in get_browser.page_source  

def test_edit_location_failure_inputtoolong_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Locations keywords", current_url)
    click_link(get_browser, "Change", current_url)
    time.sleep(1)
    enter_input_text(get_browser, 'Keyword', 'this_is_too_long_to_update_the_location_keyword')
    assert 'Keyword must be 20 characters or less' in get_browser.page_source
    # nothing happens when continue clicked
    click_button(get_browser, 'Change keyword', current_url)
    assert 'Keyword must be 20 characters or less' in get_browser.page_source
    # the error is gone when keyword entered is right length
    enter_input_text(get_browser, 'Keyword', 'ok_length')
    assert 'Keyword must be 20 characters or less' not in get_browser.page_source

def test_edit_location_failure_keywordalreadyexists_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Locations keywords", current_url)
    click_link(get_browser, "Change", current_url)
    time.sleep(1)
    enter_input_text(get_browser, 'Keyword', 'Location Keyword 2')
    click_button(get_browser, 'Change keyword', current_url)
    assert 'This keyword already exists' in get_browser.page_source
    
def test_edit_location_empty_open_delete_dialog(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Locations keywords", current_url)
    click_link(get_browser, "Change", current_url)
    time.sleep(1)
    enter_input_text(get_browser, 'Keyword', '')
    click_button(get_browser, 'Change keyword', current_url)
    assert 'Removing the keyword will delete it from this account.' in get_browser.page_source
    assert 'Delete keyword' in get_browser.page_source

# EDIT CONTACTS
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
    enter_input_text(get_browser, 'Keyword', 'updated_keyword')
    click_button(get_browser, 'Change keyword', current_url)
    time.sleep(1)
    assert 'Contact Keyword 1' not in get_browser.page_source    
    assert 'updated_keyword' in get_browser.page_source    
    assert 'Success' in get_browser.page_source  
    assert 'Keyword edited' in get_browser.page_source  

def test_edit_contact_failure_inputtoolong_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Contacts keywords", current_url)
    assert 'Contact Keyword 1' in get_browser.page_source    
    click_link(get_browser, "Change", current_url)
    time.sleep(1)
    enter_input_text(get_browser, 'Keyword', 'this_is_too_long_to_update_the_contact_keyword')
    assert 'Keyword must be 20 characters or less' in get_browser.page_source
    # nothing happens when continue clicked
    click_button(get_browser, 'Change keyword', current_url)
    assert 'Keyword must be 20 characters or less' in get_browser.page_source
    # the error is gone when keyword entered is right length
    enter_input_text(get_browser, 'Keyword', 'ok_length')
    assert 'Keyword must be 20 characters or less' not in get_browser.page_source

def test_edit_contact_failure_keywordalreadyexists_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Contacts keywords", current_url)
    assert 'Contact Keyword 1' in get_browser.page_source    
    click_link(get_browser, "Change", current_url)
    time.sleep(1)
    enter_input_text(get_browser, 'Keyword', 'Contact Keyword 2')
    click_button(get_browser, 'Change keyword', current_url)
    assert 'This keyword already exists' in get_browser.page_source

def test_edit_contact_empty_opens_delete_dialog(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Contacts keywords", current_url)
    assert 'Contact Keyword 1' in get_browser.page_source    
    click_link(get_browser, "Change", current_url)
    time.sleep(1)
    enter_input_text(get_browser, 'Keyword', '')
    click_button(get_browser, 'Change keyword', current_url)
    assert 'Removing the keyword will delete it from this account.' in get_browser.page_source
    assert 'Delete keyword' in get_browser.page_source

# DELETE location KEYWORD
def test_delete_dialog_render_location_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Locations keywords", current_url)
    click_link_more_than_one_text(get_browser, "Delete", 1, current_url)
    time.sleep(1)
    assert 'Delete keyword' in get_browser.page_source
    assert 'Close' in get_browser.page_source
    assert 'If you continue this keyword will be deleted from this account and' in get_browser.page_source

def test_delete_close_dialog_render_locations_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Locations keywords", current_url)
    click_link_more_than_one_text(get_browser, "Delete", 1, current_url)
    time.sleep(1)
    assert 'Delete keyword' in get_browser.page_source
    assert 'Close' in get_browser.page_source
    assert 'If you continue this keyword will be deleted from this account and' in get_browser.page_source
    click_span(get_browser, "×")
    time.sleep(1)
    assert 'Delete keyword' not in get_browser.page_source
    assert 'If you continue this keyword will be deleted from this account and' not in get_browser.page_source

def test_delete_cancel_dialog_render_location_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Locations keywords", current_url)
    click_link_more_than_one_text(get_browser, "Delete", 1, current_url)
    time.sleep(1)
    assert 'Delete keyword' in get_browser.page_source
    assert 'Close' in get_browser.page_source
    assert 'If you continue this keyword will be deleted from this account and' in get_browser.page_source
    click_link(get_browser, "Cancel", current_url)
    time.sleep(1)
    assert 'Delete keyword' not in get_browser.page_source
    assert 'If you continue this keyword will be deleted from this account and' not in get_browser.page_source

def test_delete_location_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Locations keywords", current_url)
    assert 'Location Keyword 1' in get_browser.page_source    
    click_link(get_browser, "Delete", current_url)
    time.sleep(1)
    click_button(get_browser, 'Delete keyword', current_url)
    time.sleep(1)
    assert 'Location Keyword 1' not in get_browser.page_source     
    assert 'Success' in get_browser.page_source  
    assert 'Keyword deleted' in get_browser.page_source  

def test_delete_from_edit_location(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Locations keywords", current_url)
    assert 'Location Keyword 1' in get_browser.page_source    
    click_link(get_browser, "Change", current_url)
    time.sleep(1)
    enter_input_text(get_browser, 'Keyword', '')
    click_button(get_browser, 'Change keyword', current_url)
    assert 'Removing the keyword will delete it from this account.' in get_browser.page_source
    assert 'Delete keyword' in get_browser.page_source
    click_button(get_browser, 'Delete keyword', current_url)
    assert 'Location Keyword 1' not in get_browser.page_source     
    assert 'Success' in get_browser.page_source  
    assert 'Keyword deleted' in get_browser.page_source  

# DELETE Contact KEYWORD
def test_delete_dialog_render_contact_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Contacts keywords", current_url)
    click_link_more_than_one_text(get_browser, "Delete", 1, current_url)
    time.sleep(1)
    assert 'Delete keyword' in get_browser.page_source
    assert 'Close' in get_browser.page_source
    assert 'If you continue this keyword will be deleted from this account and' in get_browser.page_source

def test_delete_close_dialog_render_contacts_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Contacts keywords", current_url)
    click_link_more_than_one_text(get_browser, "Delete", 1, current_url)
    time.sleep(1)
    assert 'Delete keyword' in get_browser.page_source
    assert 'Close' in get_browser.page_source
    assert 'If you continue this keyword will be deleted from this account and' in get_browser.page_source
    click_span(get_browser, "×")
    time.sleep(1)
    assert 'Delete keyword' not in get_browser.page_source
    assert 'If you continue this keyword will be deleted from this account and' not in get_browser.page_source

def test_delete_cancel_dialog_render_contacts_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Contacts keywords", current_url)
    click_link_more_than_one_text(get_browser, "Delete", 1, current_url)
    time.sleep(1)
    assert 'Delete keyword' in get_browser.page_source
    assert 'Close' in get_browser.page_source
    assert 'If you continue this keyword will be deleted from this account and' in get_browser.page_source
    click_link(get_browser, "Cancel", current_url)
    time.sleep(1)
    assert 'Delete keyword' not in get_browser.page_source
    assert 'If you continue this keyword will be deleted from this account and' not in get_browser.page_source

def test_delete_contact_keyword_tab(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Contacts keywords", current_url)
    assert 'Contact Keyword 1' in get_browser.page_source    
    click_link(get_browser, "Delete", current_url)
    time.sleep(1)
    click_button(get_browser, 'Delete keyword', current_url)
    time.sleep(1)
    assert 'Contact Keyword 1' not in get_browser.page_source     
    assert 'Success' in get_browser.page_source  
    assert 'Keyword deleted' in get_browser.page_source  

def test_delete_from_edit_contact(get_browser):
    navigate_to_auth_org_page_via_index(get_browser,current_url)
    click_link(get_browser, "Contacts keywords", current_url)
    assert 'Contact Keyword 1' in get_browser.page_source    
    click_link(get_browser, "Change", current_url)
    time.sleep(1)
    enter_input_text(get_browser, 'Keyword', '')
    click_button(get_browser, 'Change keyword', current_url)
    assert 'Removing the keyword will delete it from this account.' in get_browser.page_source
    assert 'Delete keyword' in get_browser.page_source
    click_button(get_browser, 'Delete keyword', current_url)
    assert 'Contact Keyword 1' not in get_browser.page_source     
    assert 'Success' in get_browser.page_source  
    assert 'Keyword deleted' in get_browser.page_source  

# DELETE MULTIPLE