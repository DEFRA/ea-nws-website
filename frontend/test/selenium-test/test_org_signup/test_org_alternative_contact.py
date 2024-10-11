from common import *

url_alternative_contact = url_org_signup.get('alternativeContact')
url_terms_and_condition = url_org_signup.get('declaration')

def test_empty_input(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_alternative_contact)
    click_button(get_browser, 'Continue', url_alternative_contact)
    assert "Enter your full name" in browser.page_source
    assert "Enter your email address" in browser.page_source
    assert "Enter a UK landline or mobile telephone" in browser.page_source

def test_invalid_input_email(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_alternative_contact)
    enter_input_text(get_browser, 'Email address', 'sa')
    click_button(get_browser, 'Continue', url_alternative_contact)
    assert "Enter an email address in the correct format, like name@example.com" in browser.page_source

def test_invalid_input_telephone(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_alternative_contact)
    enter_input_text(get_browser, 'Telephone number', 'sa')
    click_button(get_browser, 'Continue', url_alternative_contact)
    assert "Enter a UK landline or mobile telephone number, like 01632 960 001 or 07700 900 982" in browser.page_source

def test__valid_input(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_alternative_contact)
    enter_input_text(browser, 'Full name', 'Cammy')
    enter_input_text(browser, 'Email address', 'for@gmail.com')
    enter_input_text(browser, 'Telephone number', '07889668396')
    click_button(browser, 'Continue', url_terms_and_condition)
