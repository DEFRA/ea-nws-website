from common import *
import time

# Test citizen signout button
def test_cit_signout_button(get_browser):
    browser = get_browser
    browser.get(url_index)
    click_button(browser, 'Activate/Deactivate Mock Session 1')
    click_link(browser, 'Home page')
    click_link(browser, 'Sign Out')
    assert browser.current_url == url_cit_signout

# Test citizen signin button on signout page
def test_cit_signin_button(get_browser):
    browser = get_browser
    browser.get(url_index)
    click_button(browser, 'Activate/Deactivate Mock Session 1')
    click_link(browser, 'Home page')
    click_link(browser, 'Sign Out')
    click_button(browser, 'Sign in')
    assert browser.current_url == url_cit_signin

# Test citizen flood link
def test_cit_flood_link(get_browser):
    browser = get_browser
    browser.get(url_index)
    click_button(browser, 'Activate/Deactivate Mock Session 1')
    click_link(browser, 'Home page')
    click_link(browser, 'Sign Out')
    click_link(browser, 'protect yourself and your property online from flooding')
    time.sleep(1)
    assert browser.current_url == url_flood

# Test citizen feedback link
def test_cit_feedback_link(get_browser):
    browser = get_browser
    browser.get(url_index)
    click_button(browser, 'Activate/Deactivate Mock Session 1')
    click_link(browser, 'Home page')
    click_link(browser, 'Sign Out')
    click_link(browser, 'What do you think of this service?')
    time.sleep(1)
    assert browser.current_url == url_feedback

# TODO: Need to fix theses 2 tests below, failing due to header
# Test organisation signout button
# def test_org_signout_button(get_browser):
#     browser = get_browser
#     browser.get(url_index)
#     click_button(browser, 'Activate/Deactivate Mock Session 1')
#     click_link(browser, 'Organisation home page')
#     click_link(browser, 'Sign Out')
#     assert browser.current_url == url_org_signout

# # Test organisation signin button on signout page
# def test_org_signin_button(get_browser):
#     browser = get_browser
#     browser.get(url_index)
#     click_button(browser, 'Activate/Deactivate Mock Session 1')
#     click_link(browser, 'Organisation home page')
#     click_link(browser, 'Sign Out')
#     click_button(browser, 'Sign in')
#     assert browser.current_url == url_org_signin
