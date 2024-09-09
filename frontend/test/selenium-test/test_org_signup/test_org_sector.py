from common import *

url_sector = url_org_signup.get('sector')
url_main_admin = url_org_signup.get('mainAdmin')

def test_empty_input(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_sector)
    click_button(browser, 'Continue', url_sector)
    assert "Select whether your organisation is involved in responding to public emergencies or incidents" in browser.page_source

def test_no(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_sector)
    select_input_radio_option(browser, 'idNo', 'id')
    click_button(browser, 'Continue', url_main_admin)

def test_yes(get_browser):
    browser = navigate_to_unauth_page_via_index(get_browser, url_sector)
    select_input_radio_option(browser, 'idYes', 'id')
    click_button(browser, 'Continue', url_main_admin)