from common import *

url_signup = url_org_signup.get('signup')
url_address = url_org_signup.get('address')
url_duplicate_org = url_org_signup.get('duplicateOrg')

def test_empty_input(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_signup)
    click_button(browser, 'Continue', url_signup)
    assert "Enter your organisation's name" in browser.page_source

def test_long_input(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_signup)
    long_text = "A" * 51
    enter_input_text(browser, 'govuk-text-input', long_text, 'id')
    click_button(browser, 'Continue', url_signup)
    assert check_error_summary(browser)
    assert 'Organisation name must be 50 characters or fewer' in browser.page_source

def test_duplicate_org(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_signup)
    enter_input_text(browser, 'govuk-text-input', 'duplicateOrganisation', 'id')
    click_button(browser, 'Continue', url_duplicate_org)
    assert check_h1_heading(browser, 'An account already exists for this organisation')

def test_valid_input(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_signup)
    enter_input_text(browser, 'govuk-text-input', 'Valid Organisation Name', 'id')
    click_button(browser, 'Continue', url_address)
