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