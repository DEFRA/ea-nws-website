from common import *
import time

# CITIZEN TESTS
# Test signout button
def test_cit_signout_button(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, 'Home page', url_cit_home)
    click_link(browser, 'Sign Out')
    assert browser.current_url == url_cit_signout

# Test signin button on signout page
def test_cit_signin_button(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, 'Home page', url_cit_home)
    click_link(browser, 'Sign Out')
    click_button(browser, 'Sign in')
    assert browser.current_url == url_cit_signin

# Test flood link
def test_cit_flood_link(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, 'Home page', url_cit_home)
    click_link(browser, 'Sign Out')
    click_link(browser, 'protect yourself and your property online from flooding')
    time.sleep(1)
    assert browser.current_url == url_flood

# Test feedback link
def test_cit_feedback_link(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, 'Home page', url_cit_home)
    click_link(browser, 'Sign Out')
    click_link(browser, 'What do you think of this service?')
    time.sleep(1)
    assert browser.current_url == url_feedback

# ORGANISATION TESTS
# Test signout button
def test_org_signout_button(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, 'Organisation home page', url_org_home)
    click_link(browser, 'Sign Out')
    assert "More about flooding" not in browser.page_source
    assert browser.current_url == url_org_signout

# Test signin button on signout page
def test_org_signin_button(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, 'Organisation home page', url_org_home)
    click_link(browser, 'Sign Out')
    click_button(browser, 'Sign in')
    assert browser.current_url == url_org_signin

# Test feedback link
def test_org_feedback_link(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser, 'Organisation home page', url_org_home)
    click_link(browser, 'Sign Out')
    click_link(browser, 'What do you think of this service?')
    time.sleep(1)
    assert browser.current_url == url_feedback