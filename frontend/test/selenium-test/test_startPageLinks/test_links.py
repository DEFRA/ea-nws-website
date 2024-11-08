from common import *

localhost  = 'http://localhost:3000'
url_home_page = local_host + '/home'
url_signup = localhost + '/signup/register-location/search'
url_start = localhost+'/'
def test_signin_link_not_signed_in(get_browser):
    browser = get_browser
    browser.get(url_start)
    click_link(browser,'Sign in', url_cit_signin)
    assert "Sign in to your flood warnings account" in browser.page_source

def test_Signup_button_not_signed_in(get_browser):
    browser = get_browser
    browser.get(url_start)
    click_button(browser,"Sign up for the first time",url_signup)
    assert "Check if you can get flood messages for your location" in browser.page_source

def test_signing_link_is_signed_in(get_browser):
    browser = get_browser
    navigate_to_auth_page_via_index(browser,url_start)
    click_link(browser,'Sign in', url_home_page)
    assert "home" in browser.page_source

def test_signup_button_is_Signed_in(get_browser):
    browser = get_browser
    browser = get_browser
    navigate_to_auth_page_via_index(browser,url_start)
    click_button(browser,"Sign up for the first time",url_home_page)
    assert "Home" in browser.page_source