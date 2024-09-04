from common import *

url_signup = url_org_signup.get('signup')
url_address = url_org_signup.get('address')

def test_empty_input(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_signup)
    click_button(browser, 'Continue', url_signup)
    assert "Enter your organisation's name" in browser.page_source

def test_valid_input(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_signup)
    enter_input_text(browser, 'govuk-text-input', 'Valid Organisation Name', 'id')
    click_button(browser, 'Continue', url_address)
