from common import *
from selenium.webdriver.common.by import By

# CITIZEN TESTS
# Test sign back in page
def test_cit_sign_back_in_render_redirect(get_browser):
    browser = get_browser
    browser.get(url_cit_home)
    assert browser.current_url == url_cit_sign_back_in

# Test sign in button on sign back in page
def test_cit_sign_back_in_button(get_browser):
    browser = get_browser
    browser.get(url_cit_home)
    click_button(browser, 'Sign in')
    assert browser.current_url == url_cit_signin

# ORGANISATION TESTS
# Test  sign back in page
def test_org_sign_back_in(get_browser):
    browser = get_browser
    browser.get(url_org_home)
    assert browser.current_url == url_org_sign_back_in

# Test sign in button on sign back in page
def test_org_sign_back_in_button(get_browser):
    browser = get_browser
    browser.get(url_org_home)
    click_button(browser, 'Sign in')
    assert browser.current_url == url_org_signin