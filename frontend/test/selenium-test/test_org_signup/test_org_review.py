import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from common import *

review_page = url_org_signup.get('review')
change_organisationdetails_page = url_org_man_loc.get('change').get('org_details')
change_main_administrator_page = url_org_man_loc.get('change').get('main_admin')
success_page = url_org_signup.get('success')
change_alternative_contact_page = url_org_man_loc.get('change').get('alternative_contact')


def test_reviewpage_render(get_browser):
    navigate_to_auth_org_page_via_index(get_browser, review_page)
    assert get_browser.current_url == review_page
    assert "Check your answers" in get_browser.page_source
    assert "Organisation" in get_browser.page_source
    assert "Main administrator" in get_browser.page_source
    assert "Alternative contact" in get_browser.page_source

def test_reviewpage_successpage(get_browser):
    navigate_to_auth_org_page_via_index(get_browser, review_page)
    click_button(get_browser, 'Finish and submit', success_page)

def test_reviewpage_change_orgname(get_browser):
    navigate_to_auth_org_page_via_index(get_browser, review_page)
    click_link(get_browser, 'Change', change_organisationdetails_page) 

def test_reviewpage_change_mainAdmin_name(get_browser):
    navigate_to_auth_org_page_via_index(get_browser, review_page)
    click_link_more_than_one_text(get_browser, 'Change', 5, change_main_administrator_page)

def test_reviewpage_change_alternativeContact_name(get_browser):
    navigate_to_auth_org_page_via_index(get_browser, review_page)
    click_link_more_than_one_text(get_browser, 'Change', 7, change_main_administrator_page)
