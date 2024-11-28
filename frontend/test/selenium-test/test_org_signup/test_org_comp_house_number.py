from common import *

url_number = url_org_signup.get('number')
url_sector = url_org_signup.get('sector')

def test_invalid(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_number)
    # Empty input
    click_button(browser, 'Continue', url_number)
    assert "Select whether your organisation has a Companies House number or not" in browser.page_source
    # Yes selected with no input
    select_input_radio_option(browser, 'idYes', 'id')
    click_button(browser, 'Continue', url_number)
    assert "Enter your Companies House number" in browser.page_source
    # Yes selected with long input
    enter_input_text(browser, 'Companies House number', 'AAA AAA AAA')
    click_button(browser, 'Continue', url_number)
    assert "Companies House number must be 8 characters or fewer - it can include numbers or letters" in browser.page_source
    # Yes selected with special character input
    enter_input_text(browser, 'Companies House number', 'AAA ###')
    click_button(browser, 'Continue', url_number)
    assert "Companies House number can only include numbers or letters - no special characters" in browser.page_source

def test_no(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_number)
    select_input_radio_option(browser, 'idNo', 'id')
    click_button(browser, 'Continue', url_sector)

def test_yes_with_valid_number(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_number)
    select_input_radio_option(browser, 'idYes', 'id')
    enter_input_text(browser, 'Companies House number', 'AB123456')
    click_button(browser, 'Continue', url_sector)