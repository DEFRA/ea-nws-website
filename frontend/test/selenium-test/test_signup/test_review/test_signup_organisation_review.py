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

def setup_reviewpage_test(get_browser):
    browser = activate_mock_org_1(get_browser)
    link_xpath = f"//a[text()='Sign up organisation review']"
    link_link = browser.find_element(By.XPATH, link_xpath)
    browser.execute_script("arguments[0].click();", link_link)
    time.sleep(1)
    return browser

def test_reviewpage_render(get_browser):
    browser = setup_reviewpage_test(get_browser)
    assert browser.current_url == review_page
    assert "Check your answers" in browser.page_source
    assert "Organisation" in browser.page_source
    assert "Main administrator" in browser.page_source
    assert "Alternative contact" in browser.page_source

def test_reviewpage_successpage(get_browser):
    browser = setup_reviewpage_test(get_browser)
    click_button(browser, 'Finish and submit', success_page)

def test_reviewpage_change_orgname(get_browser):
    browser = setup_reviewpage_test(get_browser)
    click_link(browser, 'Change', change_organisationdetails_page) 

def test_reviewpage_change_mainAdmin_name(get_browser):
    browser = setup_reviewpage_test(get_browser)
    click_link_more_than_one_text(browser, 'Change', 5, change_main_administrator_page)

def test_reviewpage_change_alternativeContact_name(get_browser):
    browser = setup_reviewpage_test(get_browser)
    click_link_more_than_one_text(browser, 'Change', 7, change_main_administrator_page)
