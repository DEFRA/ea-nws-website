from common import *
from selenium.webdriver.common.by import By

# CITIZEN TESTS
# Test sign back in page and signin button
def test_cit_sign_back_in(get_browser):
    browser = get_browser
    browser.get(url_cit_home)
    assert browser.current_url == url_cit_sign_back_in
    click_button(browser, 'Sign in', url_cit_signin)

# ORGANISATION TESTS
# Test sign back in page and signin button
def test_org_sign_back_in(get_browser):
    browser = get_browser
    browser.get(url_org_home)
    assert browser.current_url == url_org_signin.get('signBackIn')
    click_button(browser, 'Sign in', url_org_signin_path)